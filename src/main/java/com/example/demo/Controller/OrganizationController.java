package com.example.demo.Controller;

import com.example.demo.DTO.Organization.CreateOrgAdminRequest;
import com.example.demo.DTO.Organization.CreateOrganizationRequest;
import com.example.demo.DTO.Organization.OrganizationResponse;
import com.example.demo.DTO.Organization.UpdateOrganizationRequest;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Services.OrganizationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;

    @PostMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public OrganizationResponse createOrganization(
            @Valid
            @RequestBody
            CreateOrganizationRequest request) {

        return organizationService
                .createOrganization(request);
    }

    @PutMapping("/{organizationId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public OrganizationResponse updateOrganization(
            @PathVariable Long organizationId,
            @RequestBody UpdateOrganizationRequest request) {

        return organizationService
                .updateOrganization(
                        organizationId,
                        request);
    }


    @GetMapping("/{organizationId}")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public OrganizationResponse getOrganization(
            @PathVariable Long organizationId) {

        return organizationService
                .getOrganization(organizationId);
    }


    @GetMapping
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public List<OrganizationResponse>
    getAllOrganizations() {

        return organizationService
                .getAllOrganizations();
    }

    @PatchMapping("/{organizationId}/activate")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public void activateOrganization(
            @PathVariable Long organizationId) {

        organizationService
                .activateOrganization(organizationId);
    }

    @PatchMapping("/{organizationId}/deactivate")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public void deactivateOrganization(
            @PathVariable Long organizationId) {

        organizationService
                .deactivateOrganization(organizationId);
    }

    @PostMapping("/{organizationId}/admin")
    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public UserResponse createOrganizationAdmin(
            @PathVariable Long organizationId,
            @RequestBody CreateOrgAdminRequest request) {

        return organizationService
                .createOrganizationAdmin(
                        organizationId,
                        request);
    }


}