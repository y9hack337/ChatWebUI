package org.hack337.gptchat.controller;

import org.hack337.gptchat.entity.User;
import org.hack337.gptchat.service.ChatService;
import org.hack337.gptchat.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@RequiredArgsConstructor
public class ChatWebController {

    private final UserService userService;
    private final ChatService chatService; // Inject ChatService

    @GetMapping("/login")
    public String loginPage() {
        return "login"; // Return view name templates/login.html
    }

    @GetMapping("/register")
    public String registerPage() {
        return "register"; // Return view name templates/register.html
    }

    // Main chat UI page
    @GetMapping("/chat")
    public String chatPage(Model model) {
        // Maybe load initial chat data here if needed for SSR
        // Example: Load list of user's chats for the sidebar
        try {
            User currentUser = userService.getCurrentUser();
            model.addAttribute("userEmail", currentUser.getEmail());
            model.addAttribute("chats", chatService.getUserChats(currentUser));
        } catch (Exception e) {
            // Handle cases where user might not be logged in yet or error occurs
            // Redirect to login or show an error state?
            // For now, just log it and proceed to render the basic page
            System.err.println("Could not load user data for chat page: " + e.getMessage());
            // return "redirect:/login"; // Option: redirect if not logged in
        }
        return "chat"; // Return view name templates/chat.html
    }

    // Redirect root to chat page if logged in, otherwise login
    @GetMapping("/")
    public String indexPage() {
        try {
            userService.getCurrentUser(); // Check if logged in
            return "redirect:/chat";
        } catch (Exception e) {
            return "redirect:/login";
        }
    }
}