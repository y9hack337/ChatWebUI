package org.hack337.gptchat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan // Scan for @ConfigurationProperties (like JwtProperties)
public class GptChatApplication {

    public static void main(String[] args) {
        SpringApplication.run(GptChatApplication.class, args);
    }

    // Define WebClient.Builder bean here or in a @Configuration class
    // @Bean
    // public WebClient.Builder webClientBuilder() {
    //    return WebClient.builder();
    // }
    // Spring Boot autoconfigures WebClient.Builder, so this might not be needed unless customization is required.

}