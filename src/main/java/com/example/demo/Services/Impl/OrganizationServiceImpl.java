package com.example.demo.Services.Impl;

import com.example.demo.DTO.Organization.CreateOrgAdminRequest;
import com.example.demo.DTO.Organization.CreateOrganizationRequest;
import com.example.demo.DTO.Organization.OrganizationResponse;
import com.example.demo.DTO.Organization.UpdateOrganizationRequest;
import com.example.demo.DTO.User.CreateOrganizationUserRequest;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Entity.Organization;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.Users_Role;
import com.example.demo.Repository.OrganizationRepository;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import com.example.demo.Services.OrganizationService;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class OrganizationServiceImpl
        implements OrganizationService {

    private final OrganizationRepository organizationRepository;
    private final UserRoleRepository userRoleRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
//    private Organization organization;


    @Override
    public OrganizationResponse createOrganization(
            CreateOrganizationRequest request) {

        organizationRepository
                .findByOrganizationName(
                        request.getOrganizationName())
                .ifPresent(org -> {
                    throw new RuntimeException(
                            "Organization already exists");
                });

        Organization organization = new Organization();

        organization.setOrganizationName(
                request.getOrganizationName());

        organization.setActive(true);

        Organization saved =
                organizationRepository.save(organization);

        return mapToResponse(saved);
    }

    @Override
    public OrganizationResponse updateOrganization(
            Long organizationId,
            UpdateOrganizationRequest request) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        organization.setOrganizationName(
                request.getOrganizationName());

        return mapToResponse(
                organizationRepository.save(organization));
    }

    @Override
    public void deactivateOrganization(Long organizationId) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        organization.setActive(false);

        organizationRepository.save(organization);
    }

    @Override
    public void activateOrganization(Long organizationId) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        organization.setActive(true);

        organizationRepository.save(organization);
    }

    @Override
    public OrganizationResponse getOrganization(
            Long organizationId) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

        return mapToResponse(organization);
    }

    @Override
    public List<OrganizationResponse>
    getAllOrganizations() {

        return organizationRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public UserResponse createOrganizationAdmin(
            Long organizationId,
            CreateOrgAdminRequest request) {

        Organization organization =
                organizationRepository.findById(organizationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Organization not found"));

//        if (userRepository.existsByEmail(request.getEmail())) {
//            throw new RuntimeException(
//                    "Email already exists");
//        }
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }

        Users user = Users.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()))
                .organization(organization)
                .active(true)
                .deleted(false)
                .build();

        Users savedUser =
                userRepository.save(user);

        Role orgAdminRole =
                roleRepository.findByRoleName(
                                "ROLE_ORG_ADMIN")
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "ROLE_ORG_ADMIN not found"));

        Users_Role userRole =
                Users_Role.builder()
                        .users(savedUser)
                        .role(orgAdminRole)
                        .build();

        userRoleRepository.save(userRole);

        UserResponse response =
                new UserResponse();

        response.setUserId(savedUser.getUser_id());
        response.setFullName(savedUser.getFullName());
        response.setEmail(savedUser.getEmail());
        response.setOrganizationId(
                organization.getOrganizationId());
        response.setOrganizationName(
                organization.getOrganizationName());
        response.setActive(savedUser.getActive());
        response.setCreatedAt(savedUser.getCreatedAt());

        return response;
    }


    private UserResponse mapToResponse(
            Users users) {

        UserResponse response =
                new UserResponse();

        response.setUserId(
                users.getUser_id());

        response.setFullName(
                users.getFullName());

        response.setEmail(
                users.getEmail());

        response.setOrganizationId(
                users.getOrganization()
                        .getOrganizationId());

        response.setOrganizationName(
                users.getOrganization()
                        .getOrganizationName());

        response.setActive(
                users.getActive());

        response.setCreatedAt(
                users.getCreatedAt());

        userRoleRepository
                .findFirstByUsers(users)
                .ifPresent(userRole ->
                        response.setRoleName(
                                userRole.getRole()
                                        .getRoleName()));

        return response;
    }

    private OrganizationResponse mapToResponse(
            Organization organization) {

        OrganizationResponse response =
                new OrganizationResponse();

        response.setOrganizationId(
                organization.getOrganizationId());

        response.setOrganizationName(
                organization.getOrganizationName());

        response.setActive(
                organization.getActive());

        response.setCreatedAt(
                organization.getCreatedAt());

        response.setUpdatedAt(
                organization.getUpdatedAt());

        return response;
    }

    @Override
    public UserResponse createOrganizationUser(
            CreateOrganizationUserRequest request) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        Users orgAdmin =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Org Admin not found"));

        Organization organization =
                orgAdmin.getOrganization();

        if (organization == null) {

            throw new RuntimeException(
                    "Organization not found");
        }

        if (userRepository.findByEmail(
                request.getEmail()).isPresent()) {

            throw new RuntimeException(
                    "Email already exists");
        }

        List<String> allowedRoles = List.of(
                "ROLE_REVIEWER",
                "ROLE_FINANCE",
                "ROLE_DIRECTOR",
                "ROLE_CFO"
        );

        if (!allowedRoles.contains(request.getRoleName())) {

            throw new RuntimeException(
                    "Invalid role assignment");
        }

        Users user = Users.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(
                        passwordEncoder.encode(
                                request.getPassword()))
                .organization(organization)
                .active(true)
                .deleted(false)
                .build();

        Users savedUser =
                userRepository.save(user);


        Role role =
                roleRepository.findByRoleName(
                                request.getRoleName())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Role not found"));

        Users_Role userRole =
                Users_Role.builder()
                        .users(savedUser)
                        .role(role)
                        .build();

        userRoleRepository.save(userRole);

        UserResponse response =
                new UserResponse();

        response.setUserId(savedUser.getUser_id());
        response.setFullName(savedUser.getFullName());
        response.setEmail(savedUser.getEmail());

        response.setOrganizationId(
                organization.getOrganizationId());

        response.setOrganizationName(
                organization.getOrganizationName());

        response.setActive(savedUser.getActive());

        response.setCreatedAt(
                savedUser.getCreatedAt());

        return response;
    }

    @Override
    public List<UserResponse>
    getMyOrganizationUsers() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        String email =
                authentication.getName();

        Users admin =
                userRepository.findByEmail(email)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        Organization organization =
                admin.getOrganization();

        return userRepository
                .findByOrganization(organization)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public void deactivateOrganizationUser(
            Long userId) {

        Users targetUser =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        Users admin =
                userRepository.findByEmail(
                                authentication.getName())
                        .orElseThrow();

        if (targetUser.getUser_id()
                .equals(admin.getUser_id())) {

            throw new RuntimeException(
                    "You cannot deactivate yourself");
        }

        if (!targetUser.getOrganization()
                .getOrganizationId()
                .equals(
                        admin.getOrganization()
                                .getOrganizationId())) {

            throw new RuntimeException(
                    "Access denied");
        }

        targetUser.setActive(false);

        userRepository.save(targetUser);
    }

    @Override
    public void activateOrganizationUser(
            Long userId) {

        Users user =
                userRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"));

        user.setActive(true);

        userRepository.save(user);
    }
}