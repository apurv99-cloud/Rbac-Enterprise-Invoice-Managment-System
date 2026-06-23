package com.example.demo.Services;

import com.example.demo.DTO.Auth.AuthResponse;
import com.example.demo.DTO.Auth.LoginRequest;
import com.example.demo.DTO.User.UserResponse;

public interface AuthService {

    AuthResponse login(LoginRequest request);
    UserResponse getCurrentUser();
}