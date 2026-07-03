package com.example.demo.DTO.Invoice;

import com.example.demo.Entity.InvoiceStatus;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceResponse {

    private Long invoiceId;

    private String invoiceNumber;

    private String invoiceTitle;

    private String description;

    private BigDecimal amount;

    private LocalDate invoiceDate;

    private LocalDate dueDate;

    private InvoiceStatus status;

    private String vendorName;

    private String organizationName;

    private String workflowName;

    private LocalDateTime createdAt;
}