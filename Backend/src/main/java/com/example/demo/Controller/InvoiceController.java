package com.example.demo.Controller;

import com.example.demo.DTO.ApiResponse;
import com.example.demo.DTO.Invoice.*;
import com.example.demo.DTO.Invoice.InvoiceListResponse;
import com.example.demo.Services.InvoiceService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/invoices")
@RequiredArgsConstructor
public class InvoiceController {

    private final InvoiceService invoiceService;

    @PostMapping
    public ResponseEntity<ApiResponse<InvoiceResponse>> createInvoice(
            @Valid @RequestBody CreateInvoiceRequest request) {
 
        InvoiceResponse resp = invoiceService.createInvoice(request);
        ApiResponse<InvoiceResponse> apiResp = ApiResponse.<InvoiceResponse>builder()
                .success(true)
                .message("Invoice created successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(apiResp);
    }

    @PutMapping("/{invoiceId}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> updateInvoice(
            @PathVariable Long invoiceId,
            @Valid @RequestBody UpdateInvoiceRequest request) {
 
        InvoiceResponse resp = invoiceService.updateInvoice(invoiceId, request);
        ApiResponse<InvoiceResponse> apiResp = ApiResponse.<InvoiceResponse>builder()
                .success(true)
                .message("Invoice updated successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResp);
    }

    @PostMapping("/{invoiceId}/submit")
    public ResponseEntity<ApiResponse<InvoiceResponse>> submitInvoice(
            @PathVariable Long invoiceId) {
 
        InvoiceResponse resp = invoiceService.submitInvoice(invoiceId);
        ApiResponse<InvoiceResponse> apiResp = ApiResponse.<InvoiceResponse>builder()
                .success(true)
                .message("Invoice submitted successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResp);
    }

    @GetMapping("/{invoiceId}")
    public ResponseEntity<ApiResponse<InvoiceResponse>> getInvoice(
            @PathVariable Long invoiceId) {
 
        InvoiceResponse resp = invoiceService.getInvoice(invoiceId);
        ApiResponse<InvoiceResponse> apiResp = ApiResponse.<InvoiceResponse>builder()
                .success(true)
                .message("Invoice fetched successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResp);
    }

    @GetMapping
    public ResponseEntity<ApiResponse<java.util.List<InvoiceListResponse>>> getOrganizationInvoices() {
 
        java.util.List<InvoiceListResponse> list = invoiceService.getOrganizationInvoices();
        ApiResponse<java.util.List<InvoiceListResponse>> apiResp = ApiResponse.<java.util.List<InvoiceListResponse>>builder()
                .success(true)
                .message("Organization invoices fetched successfully")
                .data(list)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResp);
    }

    @GetMapping("/pending")
    public ResponseEntity<ApiResponse<java.util.List<InvoiceListResponse>>> getMyPendingInvoices() {
 
        java.util.List<InvoiceListResponse> list = invoiceService.getMyPendingInvoices();
        ApiResponse<java.util.List<InvoiceListResponse>> apiResp = ApiResponse.<java.util.List<InvoiceListResponse>>builder()
                .success(true)
                .message("Pending invoices fetched successfully")
                .data(list)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResp);
    }

    @PatchMapping("/{invoiceId}/approve")
    public ResponseEntity<ApiResponse<InvoiceResponse>> approveInvoice(
            @PathVariable Long invoiceId,
            @Valid @RequestBody ApproveInvoiceRequest request) {
 
        InvoiceResponse resp = invoiceService.approveInvoice(invoiceId, request);
        ApiResponse<InvoiceResponse> apiResp = ApiResponse.<InvoiceResponse>builder()
                .success(true)
                .message("Invoice approved successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResp);
    }
 
    @PatchMapping("/{invoiceId}/reject")
    public ResponseEntity<ApiResponse<InvoiceResponse>> rejectInvoice(
            @PathVariable Long invoiceId,
            @Valid @RequestBody RejectInvoiceRequest request) {
 
        InvoiceResponse resp = invoiceService.rejectInvoice(invoiceId, request);
        ApiResponse<InvoiceResponse> apiResp = ApiResponse.<InvoiceResponse>builder()
                .success(true)
                .message("Invoice rejected successfully")
                .data(resp)
                .timestamp(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(apiResp);
    }
}