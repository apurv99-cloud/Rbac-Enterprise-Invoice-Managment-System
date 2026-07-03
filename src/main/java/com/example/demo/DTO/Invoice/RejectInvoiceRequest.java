package com.example.demo.DTO.Invoice;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RejectInvoiceRequest {

    @NotBlank(message = "Rejection reason is required")
    private String comments;
}