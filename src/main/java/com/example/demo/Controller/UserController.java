package com.example.demo.Controller;

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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final OrganizationService organizationService;
    private final UserRepository userRepository;

    @PostMapping
    public UserResponse createUsers(
            @Valid @RequestBody CreateUserRequest request) {

        return userService.createUser(request);
    }

    @PutMapping("/{userId}")
    public UserResponse updateUser(
            @PathVariable Long userId,
            @RequestBody UpdateUserRequest request) {

        return userService.updateUser(userId, request);
    }

    @GetMapping("/{userId}")
    public UserResponse getUser(
            @PathVariable Long userId) {

        return userService.getUser(userId);
    }

    @GetMapping
    public List<UserResponse> getAllUsers() {

        return userService.getAllUsers();
    }


    @GetMapping("/organization/{organizationId}")
    public List<UserResponse> getUsersByOrganization(
            @PathVariable Long organizationId) {

        return userService.getUsersByOrganization(organizationId);
    }

    @PostMapping("/organization-user")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public UserResponse createOrganizationUser(
            @RequestBody
            CreateOrganizationUserRequest request) {

        return organizationService
                .createOrganizationUser(request);
    }

    @GetMapping("/my-organization")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public List<UserResponse>
    getMyOrganizationUsers() {

        return organizationService
                .getMyOrganizationUsers();
    }

    @PatchMapping("/{userId}/deactivate")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public void deactivateUser(
            @PathVariable Long userId) {

        organizationService
                .deactivateOrganizationUser(userId);
    }

    @PatchMapping("/{userId}/activate")
    @PreAuthorize("hasRole('ORG_ADMIN')")
    public void activateUser(
            @PathVariable Long userId) {

        organizationService
                .activateOrganizationUser(userId);
    }


}