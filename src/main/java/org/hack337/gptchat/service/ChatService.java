package org.hack337.gptchat.service;

import org.hack337.gptchat.dto.MessageDto; // Import MessageDto
import org.hack337.gptchat.dto.SendMessageResponse;
import org.hack337.gptchat.entity.Chat;
import org.hack337.gptchat.entity.Message;
import org.hack337.gptchat.entity.Role;
import org.hack337.gptchat.entity.User;
import org.hack337.gptchat.exception.ResourceNotFoundException;
import org.hack337.gptchat.repository.ChatRepository;
import org.hack337.gptchat.repository.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.ReactiveSecurityContextHolder;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import reactor.core.publisher.Mono;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ChatRepository chatRepository;
    private final MessageRepository messageRepository;
    private final GptService gptService;
    private final UserService userService;

    @Transactional
    public Chat startNewChat(User user) {
        Chat chat = new Chat(user);
        return chatRepository.save(chat);
    }

    @Transactional(readOnly = true)
    public List<Chat> getUserChats(User user) {
        return chatRepository.findByUserOrderByCreatedAtDesc(user);
    }

    @Transactional(readOnly = true)
    public Chat getChatById(Long chatId, User user) {
        return chatRepository.findByIdAndUserIdWithMessages(chatId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Chat", "id", chatId + " for user " + user.getId()));
    }

    @Transactional(readOnly = true)
    public List<Message> getChatMessages(Long chatId, User user) {
        Chat chat = chatRepository.findByIdAndUserId(chatId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Chat", "id", chatId + " for user " + user.getId()));
        return chat.getMessages() != null ? chat.getMessages() : Collections.emptyList();
    }

    @Transactional
    public Mono<SendMessageResponse> sendMessageAndGetResponse(Long chatId, String userMessageContent, User user) {
        Chat chat = chatRepository.findByIdAndUserIdWithMessages(chatId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Chat", "id", chatId + " for user " + user.getId()));

        final Message userMessage = new Message(chat, Role.USER, userMessageContent);
        userMessage.setTimestamp(LocalDateTime.now());
        chat.getMessages().add(userMessage);

        log.info("User message prepared for chat {}. Getting GPT response.", chatId);

        List<Message> currentHistory = new ArrayList<>(chat.getMessages());

        return gptService.getGptResponse(currentHistory)
                .flatMap(gptResponseContent -> {
                    // 5. Create and add the assistant's message
                    Message assistantMessage = new Message(chat, Role.ASSISTANT, gptResponseContent);
                    assistantMessage.setTimestamp(LocalDateTime.now());
                    chat.getMessages().add(assistantMessage);

                    Chat updatedChat = chatRepository.save(chat);
                    log.info("User and Assistant messages saved via chat {} save.", chatId);

                    Message savedUserMessage = updatedChat.getMessages().stream()
                            .filter(m -> m.getRole() == Role.USER && m.getContent().equals(userMessageContent))
                            .max(Comparator.comparing(Message::getTimestamp))
                            .orElseThrow(() -> new IllegalStateException("Could not find the newly saved user message."));

                    Message savedAssistantMessage = updatedChat.getMessages().stream()
                            .filter(m -> m.getRole() == Role.ASSISTANT && m.getContent().equals(gptResponseContent))
                            .max(Comparator.comparing(Message::getTimestamp))
                            .orElseThrow(() -> new IllegalStateException("Could not find the newly saved assistant message."));

                    log.info("Returning DTOs for User message ID {} and Assistant message ID {}",
                            savedUserMessage.getId(), savedAssistantMessage.getId());

                    SendMessageResponse response = new SendMessageResponse(
                            convertToDto(savedUserMessage),
                            convertToDto(savedAssistantMessage)
                    );
                    return Mono.just(response);
                })
                .doOnError(e -> log.error("Error processing message for chat {}: {}", chatId, e.getMessage(), e));
    }


    @Transactional
    public Mono<MessageDto> regenerateResponseForMessage(Long chatId, Long messageIdToRegenerate, User user) {
        Chat chat = chatRepository.findByIdAndUserIdWithMessages(chatId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Chat", "id", chatId + " for user " + user.getId()));

        List<Message> messages = chat.getMessages();
        if (messages == null || messages.isEmpty()) {
            return Mono.error(new IllegalStateException("Chat has no messages. Cannot regenerate."));
        }

        int targetIndex = -1;
        Message messageToUpdate = null;
        for (int i = 0; i < messages.size(); i++) {
            if (messages.get(i).getId() != null && messages.get(i).getId().equals(messageIdToRegenerate)) {
                targetIndex = i;
                messageToUpdate = messages.get(i);
                break;
            }
        }

        if (messageToUpdate == null) {
            return Mono.error(new ResourceNotFoundException("Message", "id", messageIdToRegenerate + " not found in chat " + chatId));
        }
        if (messageToUpdate.getRole() != Role.ASSISTANT) {
            return Mono.error(new IllegalArgumentException("Cannot regenerate a non-assistant message."));
        }
        if (targetIndex == 0) {
            return Mono.error(new IllegalStateException("Cannot regenerate the first message in the chat."));
        }

        List<Message> historyForRegeneration = new ArrayList<>(messages.subList(0, targetIndex));

        log.info("Regenerating response for message {} in chat {}. History size: {}", messageIdToRegenerate, chatId, historyForRegeneration.size());

        final Message finalMessageToUpdate = messageToUpdate;

        return gptService.getGptResponse(historyForRegeneration)
                .flatMap(newGptResponseContent -> {
                    finalMessageToUpdate.setContent(newGptResponseContent);
                    finalMessageToUpdate.setTimestamp(LocalDateTime.now());
                    Chat updatedChat = chatRepository.save(chat);
                    log.info("Message {} updated after regeneration for chat {}", messageIdToRegenerate, chatId);
                    return Mono.just(convertToDto(finalMessageToUpdate));
                })
                .doOnError(e -> log.error("Error during regeneration process for message {}: {}", messageIdToRegenerate, e.getMessage(), e));
    }


    @Transactional
    public MessageDto editUserMessage(Long chatId, Long messageId, String newContent, User user) {
        Chat chat = chatRepository.findByIdAndUserIdWithMessages(chatId, user.getId())
                .orElseThrow(() -> new ResourceNotFoundException("Chat", "id", chatId + " for user " + user.getId()));

        Message messageToEdit = chat.getMessages().stream()
                .filter(m -> m.getId() != null && m.getId().equals(messageId))
                .findFirst()
                .orElseThrow(() -> new ResourceNotFoundException("Message", "id", messageId + " in chat " + chatId));

        if (messageToEdit.getRole() != Role.USER) {
            log.warn("User {} attempted to edit non-USER message {} in chat {}", user.getEmail(), messageId, chatId);
            throw new AccessDeniedException("You can only edit your own messages.");
        }
        messageToEdit.setContent(newContent);
        messageToEdit.setTimestamp(LocalDateTime.now());

        chatRepository.save(chat);
        log.info("User {} edited message {} in chat {}", user.getEmail(), messageId, chatId);

        return convertToDto(messageToEdit);
    }


    private MessageDto convertToDto(Message message) {
        MessageDto dto = new MessageDto();
        dto.setId(message.getId());
        if (message.getChat() != null && message.getChat().getId() != null) {
            dto.setChatId(message.getChat().getId());
        } else {
            log.warn("Chat or Chat ID is null for Message ID: {}", message.getId());
        }
        dto.setRole(message.getRole());
        dto.setContent(message.getContent());
        dto.setTimestamp(message.getTimestamp());
        return dto;
    }
    public static class GptApiException extends RuntimeException {
        public GptApiException(String message) {
            super(message);
        }
        public GptApiException(String message, Throwable cause) {
            super(message, cause);
        }
    }
}