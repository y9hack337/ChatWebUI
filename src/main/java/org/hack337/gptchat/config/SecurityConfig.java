package org.hack337.gptchat.config;

import org.hack337.gptchat.security.JwtAuthenticationFilter;
import org.hack337.gptchat.security.UserDetailsServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer; // For CSRF/CORS lambda config
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.context.RequestAttributeSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextPersistenceFilter;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.http.HttpMethod;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final UserDetailsServiceImpl userDetailsService;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    // No need to inject SecurityContextRepository here if we define it as a bean

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // This bean explicitly defines the repository. RequestAttribute is preferred for stateless.
    // Let's try RequestAttribute FIRST, as it's closer to statelessness than HttpSession.
    // If this doesn't work, we can try HttpSessionSecurityContextRepository later.
    @Bean
    public SecurityContextRepository securityContextRepository() {
        // Stores the context only for the duration of the request attributes.
        // Might help if the issue is related to async dispatch losing ThreadLocal.
        return new RequestAttributeSecurityContextRepository();
        // Alternative to try if RequestAttribute doesn't work:
        // return new HttpSessionSecurityContextRepository();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http, SecurityContextRepository securityContextRepository) throws Exception { // Inject the repository bean
        http
                .csrf(AbstractHttpConfigurer::disable)
                // Keep session creation stateless for JWT, the repository handles context persistence per request if needed
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .requestCache(AbstractHttpConfigurer::disable)

                // Explicitly set the security context repository strategy
                .securityContext(context -> context
                                .securityContextRepository(securityContextRepository)
                        // Try PERSISTENCE_STRATEGY_ALWAYS to ensure context is saved even if unchanged
                        // .requireExplicitSave(false) // Default for RequestAttribute/HttpSession is true, try false
                )

                .cors(AbstractHttpConfigurer::disable) // Configure properly if needed
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers(
                                // Public API endpoints
                                new AntPathRequestMatcher("/api/auth/**"),
                                // Public Web UI endpoints
                                new AntPathRequestMatcher("/login"),
                                new AntPathRequestMatcher("/register"),
                                new AntPathRequestMatcher("/chat", HttpMethod.GET.name()),
                                // Static resources
                                new AntPathRequestMatcher("/css/**"),
                                new AntPathRequestMatcher("/js/**"),
                                new AntPathRequestMatcher("/webjars/**"),
                                // H2 Console (development only!)
                                new AntPathRequestMatcher("/h2-console/**"),
                                new AntPathRequestMatcher("/favicon.ico"),
                                // Error endpoint
                                new AntPathRequestMatcher("/error"),
                                new AntPathRequestMatcher("/")

                        ).permitAll()
                        // Secure the CHAT *API* endpoints
                        .requestMatchers(
                                new AntPathRequestMatcher("/api/chats/**")
                        ).authenticated()
                        // Secure any other request
                        .anyRequest().authenticated()
                )
                .headers(headers -> headers.frameOptions(frameOptions -> frameOptions.sameOrigin()))
                // Add the JWT filter *after* the SecurityContextPersistenceFilter (which uses the repository)
                // .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class); // Original position
                .addFilterBefore(jwtAuthenticationFilter, SecurityContextPersistenceFilter.class); // Try adding JWT filter earlier

        return http.build();
    }

    // Keep this if needed for favicon or other truly static assets
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/favicon.ico"));
        // Note: If you ignore here, you don't strictly need it in permitAll above, but it doesn't hurt.
    }
}