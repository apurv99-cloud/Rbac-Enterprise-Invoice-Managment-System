package com.example.demo.Services;

import com.example.demo.DTO.Payment.CreatePaymentRequest;
import com.example.demo.DTO.Payment.PaymentResponse;

import java.util.List;

public interface PaymentService {

    PaymentResponse createPayment(CreatePaymentRequest request);

    PaymentResponse getPayment(Long paymentId);

    List<PaymentResponse> getAllPayments();

}