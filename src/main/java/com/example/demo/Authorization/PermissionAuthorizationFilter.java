package com.example.demo.Authorization;

import com.example.demo.Entity.ApprovalStatus;
import com.example.demo.Repository.InvoiceApprovalRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Repository.UserRoleRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
@RequiredArgsConstructor
public class PermissionAuthorizationFilter
        extends OncePerRequestFilter {

    private final PermissionResolver permissionResolver;

    private final PermissionService permissionService;

    private final InvoiceApprovalRepository invoiceApprovalRepository;
    private final UserRepository userRepository;
    private final UserRoleRepository userRoleRepository;

    private static final Pattern INVOICE_APPROVE_PATTERN = Pattern.compile("/api/invoices/(\\d+)/approve");

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String uri = request.getRequestURI();

        // Public APIs
        if (uri.startsWith("/api/auth")
                || uri.equals("/api/organizations/complete-onboarding")) {

            filterChain.doFilter(request, response);
            return;
        }

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null
                || !authentication.isAuthenticated()) {

            response.sendError(
                    HttpServletResponse.SC_UNAUTHORIZED,
                    "Unauthorized");

            return;
        }

        PermissionRequest permissionRequest =
                permissionResolver.resolvePermission(
                        request.getMethod(),
                        uri
                );

        // Agar kisi API ki permission mapping nahi bani hai,
        // to request allow kar do.
        if (permissionRequest == null) {

            filterChain.doFilter(request, response);
            return;
        }

        // Special-case: If this is an invoice approve endpoint,
        // allow the request if the authenticated user is the assigned approver
        if (permissionRequest.getModule() == ModuleName.INVOICE
                && permissionRequest.getAction() == PermissionAction.APPROVE) {

            Matcher m = INVOICE_APPROVE_PATTERN.matcher(uri);
            if (m.find()) {
                try {
                    Long invoiceId = Long.parseLong(m.group(1));
                    String email = authentication.getName();

                    // Lookup user by email to get userId
                    java.util.Optional<com.example.demo.Entity.Users> optUser = userRepository.findByEmail(email);
                    if (optUser.isPresent()) {
                        Long userId = optUser.get().getUserId();

                        java.util.Optional<com.example.demo.Entity.InvoiceApproval> optApproval =
                                invoiceApprovalRepository.findByInvoiceIdAndApproverIdAndStatus(
                                        invoiceId,
                                        userId,
                                        ApprovalStatus.PENDING
                                );

                        if (optApproval.isPresent()) {
                            // Authenticated user is the assigned approver for this invoice
                            filterChain.doFilter(request, response);
                            return;
                        }

                        // If not the explicit assigned approver, check whether the
                        // current pending approval requires a role that the authenticated
                        // user holds (allow any user with the required role to approve)
                        java.util.Optional<com.example.demo.Entity.InvoiceApproval> workflowApproval =
                                invoiceApprovalRepository.findByInvoiceIdAndStatus(invoiceId, ApprovalStatus.PENDING);

                        if (workflowApproval.isPresent()) {
                            com.example.demo.Entity.WorkflowStep step = workflowApproval.get().getWorkflowStep();
                            com.example.demo.Entity.Role requiredRole = step.getRole();

                            // Check user's roles
                            java.util.List<com.example.demo.Entity.Users_Role> userRoles =
                                    userRoleRepository.findByUsers(optUser.get());

                            boolean hasRole = userRoles.stream()
                                    .anyMatch(ur -> ur.getRole().getRoleId().equals(requiredRole.getRoleId()));

                            if (hasRole) {
                                filterChain.doFilter(request, response);
                                return;
                            }
                        }
                    }
                } catch (NumberFormatException ex) {
                    // ignore and continue to standard permission check
                }
            }
        }

        String email = authentication.getName();

        boolean allowed =
                permissionService.hasPermission(
                        email,
                        permissionRequest
                );

        if (!allowed) {

            response.sendError(
                    HttpServletResponse.SC_FORBIDDEN,
                    "Access Denied");

            return;
        }

        filterChain.doFilter(request, response);
    }
}