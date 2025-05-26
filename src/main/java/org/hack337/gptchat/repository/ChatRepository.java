package org.hack337.gptchat.repository;

import org.hack337.gptchat.entity.Chat;
import org.hack337.gptchat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRepository extends JpaRepository<Chat, Long> {
    List<Chat> findByUserOrderByCreatedAtDesc(User user);

    @Query("SELECT c FROM Chat c LEFT JOIN FETCH c.messages WHERE c.id = :chatId AND c.user.id = :userId")
    Optional<Chat> findByIdAndUserIdWithMessages(Long chatId, Long userId);

    Optional<Chat> findByIdAndUserId(Long chatId, Long userId);
}