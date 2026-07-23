package com.example.demo.Authorization;

import com.example.demo.Entity.Permission;
import com.example.demo.Entity.RolePermission;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.Users_Role;
import com.example.demo.Repository.PermissionRepository;
import com.example.demo.Repository.RolePermissionRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PermissionServiceImpl
        implements PermissionService {

    private final UserRepository userRepository;

    private final UserRoleRepository userRoleRepository;

    private final PermissionRepository permissionRepository;

    private final RolePermissionRepository rolePermissionRepository;

    @Override
    public boolean hasPermission(
            String email,
            PermissionRequest permissionRequest
    ) {

        Users user =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        java.util.List<Users_Role> userRoles =
                userRoleRepository.findByUsers(user);

        if (userRoles == null || userRoles.isEmpty()) {
            throw new RuntimeException("Role not assigned");
        }

        Permission permission =
                permissionRepository
                        .findByModule_ModuleNameAndAction(
                                permissionRequest.getModule().name(),
                                permissionRequest.getAction()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Permission not found"));

        // Check across all roles assigned to user
        for (Users_Role ur : userRoles) {
            boolean has = rolePermissionRepository
                    .findByRole(ur.getRole())
                    .stream()
                    .map(RolePermission::getPermission)
                    .anyMatch(p -> p.getPermissionId().equals(permission.getPermissionId()));
            if (has) return true;
        }

        return false;
    }
}