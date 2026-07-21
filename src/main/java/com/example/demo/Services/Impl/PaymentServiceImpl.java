package com.example.demo.Services.Impl;

import com.example.demo.DTO.Payment.CreatePaymentRequest;
import com.example.demo.DTO.Payment.PaymentResponse;
import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.InvoiceStatus;
import com.example.demo.Entity.Payment;
import com.example.demo.Entity.Users;
import com.example.demo.Repository.InvoiceRepository;
import com.example.demo.Repository.PaymentRepository;
import com.example.demo.Repository.UserRepository;
import com.example.demo.Services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepository paymentRepository;
    private final InvoiceRepository invoiceRepository;
    private final UserRepository userRepository;

    @Override
    public PaymentResponse createPayment(CreatePaymentRequest request) {

        // Fetch Invoice
        Invoice invoice = invoiceRepository.findById(request.getInvoiceId())
                .orElseThrow(() ->
                        new RuntimeException("Invoice not found"));

        // Invoice must be approved
        if (invoice.getStatus() != InvoiceStatus.APPROVED) {
            throw new RuntimeException(
                    "Only approved invoices can be marked as paid.");
        }

        // Prevent duplicate payment
        if (paymentRepository.existsByInvoice(invoice)) {
            throw new RuntimeException(
                    "Payment already exists for this invoice.");
        }

        // Current Logged In User
        UserDetails userDetails =
                (UserDetails) SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getPrincipal();

        Users currentUser = userRepository
                .findByEmail(userDetails.getUsername())
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // Create Payment
        Payment payment = Payment.builder()
                .invoice(invoice)
                .paymentReference(request.getPaymentReference())
                .paymentMethod(request.getPaymentMethod())
                .paymentDate(request.getPaymentDate())
                .remarks(request.getRemarks())
                .paidBy(currentUser)
                .deleted(false)
                .build();

        paymentRepository.save(payment);

        // Update Invoice Status
        invoice.setStatus(InvoiceStatus.PAID);
        invoiceRepository.save(invoice);

        // Return Response
        return PaymentResponse.builder()
                .paymentId(payment.getPaymentId())
                .invoiceId(invoice.getInvoiceId())
                .invoiceNumber(invoice.getInvoiceNumber())
                .amount(invoice.getAmount())
                .paymentReference(payment.getPaymentReference())
                .paymentMethod(payment.getPaymentMethod())
                .paymentDate(payment.getPaymentDate())
                .paidBy(currentUser.getFullName())
                .remarks(payment.getRemarks())
                .createdAt(payment.getCreatedAt())
                .build();
    }

    @Override
    @Transactional(readOnly = true)
    public PaymentResponse getPayment(Long paymentId) {

        Payment payment = paymentRepository.findById(paymentId)
                .orElseThrow(() ->
                        new RuntimeException("Payment not found"));

        return mapToResponse(payment);
    }

    @Override
    @Transactional(readOnly = true)
    public List<PaymentResponse> getAllPayments() {

        return paymentRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private PaymentResponse mapToResponse(Payment payment) {

        return PaymentResponse.builder()
                .paymentId(payment.getPaymentId())
                .invoiceId(payment.getInvoice().getInvoiceId())
                .invoiceNumber(payment.getInvoice().getInvoiceNumber())
                .amount(payment.getInvoice().getAmount())
                .paymentReference(payment.getPaymentReference())
                .paymentMethod(payment.getPaymentMethod())
                .paymentDate(payment.getPaymentDate())
                .paidBy(payment.getPaidBy().getFullName())
                .remarks(payment.getRemarks())
                .createdAt(payment.getCreatedAt())
                .build();
    }
}