package com.example.demo.Controller;

import com.example.demo.DTO.Auth.AuthResponse;
import com.example.demo.DTO.Auth.LoginRequest;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public AuthResponse login(
            @RequestBody LoginRequest request) {

        return authService.login(request);
    }

    @GetMapping("/me")
    public UserResponse getCurrentUser() {

        return authService.getCurrentUser();
    }
}