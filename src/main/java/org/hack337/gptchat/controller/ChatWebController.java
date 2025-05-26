package org.hack337.gptchat.controller;

import org.hack337.gptchat.entity.User;
import org.hack337.gptchat.service.ChatService;
import org.hack337.gptchat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication; // Import
import org.springframework.security.core.context.SecurityContextHolder; // Import

@Controller
@RequiredArgsConstructor
public class ChatWebController {

    private final UserService userService;
    private final ChatService chatService;

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // Return view name templates/login.html
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Return view name templates/register.html
    }

    @GetMapping("/chat")
    public String chatPage(Model model) {
        try {
            User currentUser = userService.getCurrentUser();
            model.addAttribute("userEmail", currentUser.getEmail());
            model.addAttribute("chats", chatService.getUserChats(currentUser));
        } catch (Exception e) {
            System.err.println("Could not load user data for chat page: " + e.getMessage());
        }
        return "chat";
    }

    @GetMapping("/")
    public String indexPage() {
        return "redirect:/chat";
    }

    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ChatApiController.class);
}