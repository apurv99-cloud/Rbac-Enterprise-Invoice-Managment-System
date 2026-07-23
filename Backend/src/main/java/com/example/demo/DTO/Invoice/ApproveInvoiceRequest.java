package com.example.demo.DTO.Invoice;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApproveInvoiceRequest {

    @NotBlank(message = "Comments are required")
    private String comments;
}