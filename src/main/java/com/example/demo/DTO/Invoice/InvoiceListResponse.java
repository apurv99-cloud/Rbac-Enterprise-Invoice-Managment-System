package com.example.demo.DTO.Invoice;

import com.example.demo.Entity.InvoiceStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceListResponse {

    private Long invoiceId;

    private String invoiceNumber;

    private String invoiceTitle;

    private BigDecimal amount;

    private InvoiceStatus status;

    private String vendorName;

    private String currentApprover;

    private LocalDateTime createdAt;
}