package org.hack337.gptchat.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class GptResponse {
    private String answer;
    private String type;
}