package com.example.demo.DTO.Invoice;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UpdateInvoiceRequest {

    @NotBlank
    private String invoiceTitle;

    @NotBlank
    private String description;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal amount;

    @NotNull
    private LocalDate invoiceDate;

    @NotNull
    private LocalDate dueDate;
}