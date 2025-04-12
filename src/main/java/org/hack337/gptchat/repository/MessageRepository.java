package org.hack337.gptchat.repository;

import org.hack337.gptchat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
    // Specific queries if needed, e.g., find by chat ID ordered by timestamp
    // List<Message> findByChatIdOrderByTimestampAsc(Long chatId); // Covered by @OrderBy in Chat entity
}