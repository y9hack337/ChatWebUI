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

    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    @NoArgsConstructor
    public static class UsageInfo {
        @JsonProperty("prompt_tokens")
        private Integer promptTokens;

        @JsonProperty("completion_tokens")
        private Integer completionTokens;

        @JsonProperty("total_tokens")
        private Integer totalTokens;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    @NoArgsConstructor
    public static class Choice {
        private ResponseMessage message;

        @JsonProperty("finish_reason")
        private String finishReason;

        private Integer index;
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    @Data
    @NoArgsConstructor
    public static class ResponseMessage {
        private String role;
        private String content;
    }

    public String getFirstChoiceContent() {
        if (choices != null && !choices.isEmpty()) {
            Choice firstChoice = choices.get(0);
            if (firstChoice != null && firstChoice.getMessage() != null) {
                return firstChoice.getMessage().getContent();
            }
        }
        log.warn("Could not extract content from GPT API response structure: {}", this);
        return null;
    }

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(GptApiResponse.class);
}