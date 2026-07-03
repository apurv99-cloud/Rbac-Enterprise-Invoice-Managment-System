package com.example.demo.Controller;

import com.example.demo.DTO.ApiResponse;
import com.example.demo.DTO.Auth.AuthResponse;
import com.example.demo.DTO.Auth.LoginRequest;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Services.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(
            @RequestBody LoginRequest request) {

        AuthResponse resp = authService.login(request);
        ApiResponse<AuthResponse> api = ApiResponse.<AuthResponse>builder()
                .success(true)
                .message("Login successful")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<UserResponse>> getCurrentUser() {

        UserResponse resp = authService.getCurrentUser();
        ApiResponse<UserResponse> api = ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User fetched successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }
}