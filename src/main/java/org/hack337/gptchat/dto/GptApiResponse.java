package org.hack337.gptchat.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

// Ignore properties not defined in our DTO to avoid errors if the API adds more fields
@JsonIgnoreProperties(ignoreUnknown = true)
@Data
@NoArgsConstructor
public class GptApiResponse {

    private String id;
    private String object;
    private Long created; // Assuming timestamp is a long (Unix epoch seconds/millis)
    private String model;
    private UsageInfo usage;
    private List<Choice> choices;

    // Nested class for the 'usage' object
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    @NoArgsConstructor
    public static class UsageInfo {
        @JsonProperty("prompt_tokens") // Maps JSON snake_case to Java camelCase
        private Integer promptTokens;

        @JsonProperty("completion_tokens")
        private Integer completionTokens;

        @JsonProperty("total_tokens")
        private Integer totalTokens;
    }

    // Nested class for objects inside the 'choices' array
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    @NoArgsConstructor
    public static class Choice {
        private ResponseMessage message;

        @JsonProperty("finish_reason")
        private String finishReason;

        private Integer index;
    }

    // Nested class for the 'message' object inside a 'choice'
    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    @NoArgsConstructor
    public static class ResponseMessage {
        private String role;
        private String content;
    }

    // Helper method to easily extract the main content (handle potential errors)
    public String getFirstChoiceContent() {
        if (choices != null && !choices.isEmpty()) {
            Choice firstChoice = choices.get(0);
            if (firstChoice != null && firstChoice.getMessage() != null) {
                return firstChoice.getMessage().getContent();
            }
        }
        // Return null or throw an exception if the structure is unexpected or content is missing
        log.warn("Could not extract content from GPT API response structure: {}", this);
        return null;
    }

    // Add a static logger if using the helper method above
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(GptApiResponse.class);
}