package org.hack337.gptchat.dto;

import org.hack337.gptchat.entity.Role;
import lombok.Data;
import java.time.LocalDateTime;

@Data
public class MessageDto {
    private Long id;
    private Long chatId;
    private Role role;
    private String content;
    private LocalDateTime timestamp;
}