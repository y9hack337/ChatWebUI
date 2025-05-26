package org.hack337.gptchat.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.validation.annotation.Validated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Configuration
@ConfigurationProperties(prefix = "jwt")
@Getter
@Setter
@Validated
public class JwtProperties {
    @NotBlank(message = "JWT secret cannot be blank")
    private String secret;
    @NotNull(message = "JWT expiration cannot be null")
    private Long expirationMs;
}
