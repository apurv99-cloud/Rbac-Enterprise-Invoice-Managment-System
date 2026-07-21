package com.example.demo.DTO.Payment;

import com.example.demo.Entity.PaymentMethod;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CreatePaymentRequest {


    private Long invoiceId;

    private String paymentReference;

    private PaymentMethod paymentMethod;

    private LocalDate paymentDate;

    private String remarks;
}
