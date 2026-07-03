package com.example.demo.Controller;

import com.example.demo.DTO.ApiResponse;
import com.example.demo.DTO.Organization.*;
import com.example.demo.DTO.User.UserResponse;
import com.example.demo.Services.OrganizationService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/organizations")
@RequiredArgsConstructor
public class OrganizationController {

    private final OrganizationService organizationService;

    @PostMapping
//    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<OrganizationResponse>> createOrganization(
            @Valid
            @RequestBody
            CreateOrganizationRequest request) {

        OrganizationResponse resp = organizationService.createOrganization(request);
        ApiResponse<OrganizationResponse> api = ApiResponse.<OrganizationResponse>builder()
                .success(true)
                .message("Organization created successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @PutMapping("/{organizationId}")
//    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<OrganizationResponse>> updateOrganization(
            @PathVariable Long organizationId,
            @RequestBody UpdateOrganizationRequest request) {

        OrganizationResponse resp = organizationService.updateOrganization(organizationId, request);
        ApiResponse<OrganizationResponse> api = ApiResponse.<OrganizationResponse>builder()
                .success(true)
                .message("Organization updated successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }


    @GetMapping("/{organizationId}")
//    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<OrganizationResponse>> getOrganization(
            @PathVariable Long organizationId) {

        OrganizationResponse resp = organizationService.getOrganization(organizationId);
        ApiResponse<OrganizationResponse> api = ApiResponse.<OrganizationResponse>builder()
                .success(true)
                .message("Organization fetched successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }


    @GetMapping
//    @PreAuthorize("hasRole('ROLE_SUPER_ADMIN')")
//    @PreAuthorize("hasAuthority('ROLE_SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<List<OrganizationResponse>>>
    getAllOrganizations() {

        List<OrganizationResponse> list = organizationService.getAllOrganizations();
        ApiResponse<List<OrganizationResponse>> api = ApiResponse.<List<OrganizationResponse>>builder()
                .success(true)
                .message("Organizations fetched successfully")
                .data(list)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @PatchMapping("/{organizationId}/activate")
//    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Object>> activateOrganization(
            @PathVariable Long organizationId) {

        organizationService.activateOrganization(organizationId);
        ApiResponse<Object> api = ApiResponse.builder()
                .success(true)
                .message("Organization activated successfully")
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @PatchMapping("/{organizationId}/deactivate")
//    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Object>> deactivateOrganization(
            @PathVariable Long organizationId) {

        organizationService.deactivateOrganization(organizationId);
        ApiResponse<Object> api = ApiResponse.builder()
                .success(true)
                .message("Organization deactivated successfully")
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

//    @PostMapping("/{organizationId}/admin")
//    @PreAuthorize("hasRole('SUPER_ADMIN')")
//    public UserResponse createOrganizationAdmin(
//            @PathVariable Long organizationId,
//            @RequestBody CreateOrgAdminRequest request) {
//
//        return organizationService
//                .createOrganizationAdmin(
//                        organizationId,
//                        request);
//    }

    @PostMapping("/{organizationId}/send-onboarding")
//    @PreAuthorize("hasRole('SUPER_ADMIN')")
    public ResponseEntity<ApiResponse<Object>> sendOnboarding(
            @PathVariable Long organizationId) {

        organizationService.sendOrganizationOnboarding(organizationId);
        ApiResponse<Object> api = ApiResponse.builder()
                .success(true)
                .message("Organization onboarding email sent")
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }

    @PostMapping("/complete-onboarding")
    public ResponseEntity<ApiResponse<Object>> completeOnboarding(
            @RequestBody
            CompleteOnboardingRequest request) {

        organizationService.completeOnboarding(request);
        ApiResponse<Object> api = ApiResponse.builder()
                .success(true)
                .message("Organization onboarding completed")
                .data(null)
                .timestamp(LocalDateTime.now())
                .build();
        return ResponseEntity.ok(api);
    }


}