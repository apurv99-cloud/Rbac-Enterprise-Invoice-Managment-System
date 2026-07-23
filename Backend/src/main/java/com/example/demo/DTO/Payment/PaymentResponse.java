package com.example.demo.DTO.Payment;

import com.example.demo.Entity.PaymentMethod;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponse {
    private Long paymentId;

    private Long invoiceId;

    private String invoiceNumber;

    private BigDecimal amount;

    private String paymentReference;

    private PaymentMethod paymentMethod;

    private LocalDate paymentDate;

    private String paidBy;

    private String remarks;

    private LocalDateTime createdAt;
}
