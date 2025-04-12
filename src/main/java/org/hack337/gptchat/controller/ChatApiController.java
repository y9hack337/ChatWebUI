package org.hack337.gptchat.controller;

import jakarta.validation.Valid;
import org.hack337.gptchat.dto.ChatDto;
import org.hack337.gptchat.dto.EditMessageRequest;
import org.hack337.gptchat.dto.MessageDto;
import org.hack337.gptchat.dto.SendMessageResponse;
import org.hack337.gptchat.entity.Chat;
import org.hack337.gptchat.entity.Message; // Import Message entity
import org.hack337.gptchat.entity.User;
import org.hack337.gptchat.exception.ResourceNotFoundException;
import org.hack337.gptchat.service.ChatService;
import org.hack337.gptchat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono; // Import Mono

import java.util.List;
import java.util.stream.Collectors;
import java.time.LocalDateTime; // Import LocalDateTime


@RestController
@RequestMapping("/api/chats")
@RequiredArgsConstructor
public class ChatApiController {

    private final ChatService chatService;
    private final UserService userService;

    // Start a new chat
    @PostMapping
    public ResponseEntity<ChatDto> startNewChat() {
        User currentUser = userService.getCurrentUser();
        Chat newChat = chatService.startNewChat(currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToDto(newChat));
    }

    // Get all chats for the current user
    @GetMapping
    public ResponseEntity<List<ChatDto>> getUserChats() {
        User currentUser = userService.getCurrentUser();
        List<Chat> chats = chatService.getUserChats(currentUser);
        List<ChatDto> chatDtos = chats.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(chatDtos);
    }

    // Get messages for a specific chat
    @GetMapping("/{chatId}/messages")
    public ResponseEntity<List<MessageDto>> getChatMessages(@PathVariable Long chatId) {
        User currentUser = userService.getCurrentUser();
        // Ensure ownership is checked within getChatMessages or getChatById
        List<Message> messages = chatService.getChatMessages(chatId, currentUser);
        List<MessageDto> messageDtos = messages.stream().map(this::convertToDto).collect(Collectors.toList());
        return ResponseEntity.ok(messageDtos);
    }

    // Send a message to a chat (triggers GPT interaction)
    @PostMapping("/{chatId}/messages")
    public Mono<ResponseEntity<SendMessageResponse>> sendMessage( // Return SendMessageResponse
                                                                  @PathVariable Long chatId,
                                                                  @RequestBody MessageRequest messageRequest) {

        User currentUser = userService.getCurrentUser();
        return chatService.sendMessageAndGetResponse(chatId, messageRequest.getContent(), currentUser)
                // Wrap the SendMessageResponse in ResponseEntity
                .map(response -> ResponseEntity.status(HttpStatus.CREATED).body(response))
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build())
                .onErrorResume(e -> {
                    log.error("Error sending message: {}", e.getMessage(), e);
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

    // Endpoint for regeneration
    @PostMapping("/{chatId}/messages/{messageId}/regenerate")
    public Mono<ResponseEntity<MessageDto>> regenerateResponse(
            @PathVariable Long chatId,
            @PathVariable Long messageId) { // Add messageId path variable
        log.info(">>> HIT regenerateResponse controller method for chatId: {}, messageId: {}", chatId, messageId);
        User currentUser = userService.getCurrentUser();
        // Pass messageId to the service method
        return chatService.regenerateResponseForMessage(chatId, messageId, currentUser)
                .map(updatedAssistantMessageDto -> ResponseEntity.status(HttpStatus.OK).body(updatedAssistantMessageDto)) // Return 200 OK on update
                .defaultIfEmpty(ResponseEntity.status(HttpStatus.NOT_FOUND).build())
                .onErrorResume(e -> {
                    log.error("Error regenerating response for message {}: {}", messageId, e.getMessage(), e);
                    if (e instanceof IllegalArgumentException || e instanceof ResourceNotFoundException || e instanceof IllegalStateException) {
                        // Specific errors related to finding the message or invalid state
                        return Mono.just(ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null)); // Or an error DTO
                    }
                    // Handle potential GptApiException
                    if (e instanceof ChatService.GptApiException) {
                        return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null)); // Indicate backend error talking to GPT
                    }
                    // Generic internal error
                    return Mono.just(ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build());
                });
    }

    @PutMapping("/{chatId}/messages/{messageId}")
    public ResponseEntity<?> editMessage(
            @PathVariable Long chatId,
            @PathVariable Long messageId,
            @Valid @RequestBody EditMessageRequest editRequest) { // Use @Valid for validation
        try {
            User currentUser = userService.getCurrentUser();
            MessageDto updatedMessage = chatService.editUserMessage(chatId, messageId, editRequest.getContent(), currentUser);
            return ResponseEntity.ok(updatedMessage);
        } catch (ResourceNotFoundException e) {
            log.warn("Edit failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (AccessDeniedException e) {
            log.warn("Edit failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (IllegalArgumentException e) {
            log.warn("Edit failed: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            log.error("Error editing message {} in chat {}: {}", messageId, chatId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to edit message.");
        }
    }

    // --- DTO Converters ---
    private ChatDto convertToDto(Chat chat) {
        ChatDto dto = new ChatDto();
        dto.setId(chat.getId());
        dto.setUserId(chat.getUser().getId());
        dto.setCreatedAt(chat.getCreatedAt());
        // Decide whether to include messages here or fetch separately
        // if (chat.getMessages() != null) {
        //     dto.setMessages(chat.getMessages().stream().map(this::convertToDto).collect(Collectors.toList()));
        // }
        return dto;
    }

    private MessageDto convertToDto(Message message) {
        MessageDto dto = new MessageDto();
        dto.setId(message.getId());
        dto.setChatId(message.getChat().getId());
        dto.setRole(message.getRole());
        dto.setContent(message.getContent());
        dto.setTimestamp(message.getTimestamp());
        return dto;
    }

    // Simple DTO for receiving message content
    @lombok.Data // Using Lombok for brevity
    static class MessageRequest {
        private String content;
    }

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ChatApiController.class);
}
