package org.hack337.gptchat.service;

import org.hack337.gptchat.entity.User;
import org.hack337.gptchat.exception.ResourceNotFoundException;
import org.hack337.gptchat.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getCurrentUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String username;
        if (principal instanceof UserDetails) {
            username = ((UserDetails) principal).getUsername();
        } else if (principal instanceof String) {
            username = (String) principal; // Should not happen with JWT typically
        }
        else {
            throw new IllegalStateException("Unexpected principal type: " + principal.getClass());
        }

        return userRepository.findByEmail(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "email", username));
    }
}