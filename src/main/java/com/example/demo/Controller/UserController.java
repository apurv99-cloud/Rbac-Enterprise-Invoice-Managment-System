package com.example.demo.Controller;

import com.example.demo.DTO.ApiResponse;
import com.example.demo.DTO.User.CreateOrganizationUserRequest;
import com.example.demo.DTO.User.CreateUserRequest;
import com.example.demo.DTO.User.UpdateUserRequest;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Entity.Users;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Services.OrganizationService;
import com.example.demo.Services.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final OrganizationService organizationService;
    private final UserRepository userRepository;

    @PostMapping
    public ResponseEntity<ApiResponse<UserResponse>> createUsers(
            @Valid @RequestBody CreateUserRequest request) {

        UserResponse resp = userService.createUser(request);
        ApiResponse<UserResponse> api = ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User created successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> updateUser(
            @PathVariable Long userId,
            @RequestBody UpdateUserRequest request) {

        UserResponse resp = userService.updateUser(userId, request);
        ApiResponse<UserResponse> api = ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User updated successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse<UserResponse>> getUser(
            @PathVariable Long userId) {

        UserResponse resp = userService.getUser(userId);
        ApiResponse<UserResponse> api = ApiResponse.<UserResponse>builder()
                .success(true)
                .message("User fetched successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<UserResponse>>> getAllUsers() {

        List<UserResponse> list = userService.getAllUsers();
        ApiResponse<List<UserResponse>> api = ApiResponse.<List<UserResponse>>builder()
                .success(true)
                .message("All users fetched successfully")
                .data(list)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }


    @GetMapping("/organization/{organizationId}")
    public ResponseEntity<ApiResponse<List<UserResponse>>> getUsersByOrganization(
            @PathVariable Long organizationId) {

        List<UserResponse> list = userService.getUsersByOrganization(organizationId);
        ApiResponse<List<UserResponse>> api = ApiResponse.<List<UserResponse>>builder()
                .success(true)
                .message("Users for organization fetched successfully")
                .data(list)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @PostMapping("/organization-user")
    public ResponseEntity<ApiResponse<UserResponse>> createOrganizationUser(
            @RequestBody
            CreateOrganizationUserRequest request) {

        UserResponse resp = organizationService.createOrganizationUser(request);
        ApiResponse<UserResponse> api = ApiResponse.<UserResponse>builder()
                .success(true)
                .message("Organization user created successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @GetMapping("/my-organization")
    public ResponseEntity<ApiResponse<List<UserResponse>>>
    getMyOrganizationUsers() {

        List<UserResponse> list = organizationService.getMyOrganizationUsers();
        ApiResponse<List<UserResponse>> api = ApiResponse.<List<UserResponse>>builder()
                .success(true)
                .message("My organization users fetched successfully")
                .data(list)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @PatchMapping("/{userId}/deactivate")
    public ResponseEntity<ApiResponse<Object>> deactivateUser(
            @PathVariable Long userId) {

        organizationService.deactivateOrganizationUser(userId);
        ApiResponse<Object> api = ApiResponse.builder()
                .success(true)
                .message("User deactivated successfully")
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @PatchMapping("/{userId}/activate")
    public ResponseEntity<ApiResponse<Object>> activateUser(
            @PathVariable Long userId) {

        organizationService.activateOrganizationUser(userId);
        ApiResponse<Object> api = ApiResponse.builder()
                .success(true)
                .message("User activated successfully")
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }


}