package org.hack337.gptchat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SendMessageResponse {
    private MessageDto userMessage;
    private MessageDto assistantMessage;
}