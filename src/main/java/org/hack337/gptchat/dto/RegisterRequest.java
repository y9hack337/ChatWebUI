package org.hack337.gptchat.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank @Email private String email;
    @NotBlank @Size(min = 6) private String password;
    // Add password confirmation field if needed for UI validation
}