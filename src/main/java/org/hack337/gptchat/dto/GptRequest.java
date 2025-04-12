package org.hack337.gptchat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GptRequest {
    private String model;

    private List<MessagePayload> messages;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MessagePayload {
        private String role; // "user", "assistant", "system"
        private String content;
    }
}