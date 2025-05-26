package org.hack337.gptchat.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class ChatDto {
    private Long id;
    private Long userId;
    private LocalDateTime createdAt;
    private List<MessageDto> messages;
}