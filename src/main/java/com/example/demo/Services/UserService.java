package com.example.demo.Services;

import com.example.demo.DTO.Organization.CreateOrgAdminRequest;
import com.example.demo.DTO.User.*;
import com.example.demo.Entity.Users;

import java.util.List;

public interface UserService {

    UserResponse createUser(
            CreateUserRequest request);

    UserResponse updateUser(
            Long userId,
            UpdateUserRequest request);

    UserResponse getUser(Long userId);

    List<UserResponse> getAllUsers();

    List<UserResponse> getUsersByOrganization(
            Long organizationId);

    void activateUser(Long userId);

    void deactivateUser(Long userId);

    UserResponse createOrganizationAdmin(
            Long organizationId,
            CreateOrgAdminRequest request);

    void assignRoleToUser(Users user, String roleName);
}