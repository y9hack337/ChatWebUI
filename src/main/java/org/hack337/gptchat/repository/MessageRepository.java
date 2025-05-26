package org.hack337.gptchat.repository;

import org.hack337.gptchat.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {}