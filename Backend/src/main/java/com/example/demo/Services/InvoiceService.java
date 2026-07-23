package com.example.demo.Services;

import com.example.demo.DTO.Invoice.*;

import java.util.List;

public interface InvoiceService {

    InvoiceResponse createInvoice(
            CreateInvoiceRequest request);

    InvoiceResponse updateInvoice(
            Long invoiceId,
            UpdateInvoiceRequest request);

    InvoiceResponse getInvoice(
            Long invoiceId);

    List<InvoiceListResponse> getOrganizationInvoices();

    List<InvoiceListResponse> getMyPendingInvoices();

    com.example.demo.DTO.Invoice.InvoiceResponse approveInvoice(
            Long invoiceId,
            ApproveInvoiceRequest request);
 
    com.example.demo.DTO.Invoice.InvoiceResponse rejectInvoice(
            Long invoiceId,
            RejectInvoiceRequest request);

    InvoiceResponse submitInvoice(Long invoiceId);
}