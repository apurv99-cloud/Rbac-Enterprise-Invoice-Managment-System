package com.example.demo.Repository;

import com.example.demo.Entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface InvoiceApprovalRepository extends JpaRepository<InvoiceApproval, Long> {
    List<InvoiceApproval> findByInvoice(Invoice invoice);

    List<InvoiceApproval> findByApprover(Users approver);

    Optional<InvoiceApproval>
    findByInvoiceAndWorkflowStep(
            Invoice invoice,
            WorkflowStep workflowStep
    );

    Optional<InvoiceApproval>
    findByInvoiceAndApproverAndStatus(
            Invoice invoice,
            Users approver,
            ApprovalStatus status
    );

    // WE WILL ADD THIS LATER
    List<InvoiceApproval>
    findByApproverAndStatus(
            Users approver,
            ApprovalStatus status
    );

    @org.springframework.data.jpa.repository.Query("SELECT ia FROM InvoiceApproval ia WHERE ia.approver.userId = :userId AND ia.status = :status")
    List<InvoiceApproval> findByApproverIdAndStatus(Long userId, ApprovalStatus status);

    @org.springframework.data.jpa.repository.Query("SELECT ia FROM InvoiceApproval ia WHERE ia.invoice.invoiceId = :invoiceId AND ia.approver.userId = :userId AND ia.status = :status")
    java.util.Optional<InvoiceApproval> findByInvoiceIdAndApproverIdAndStatus(Long invoiceId, Long userId, ApprovalStatus status);

    @org.springframework.data.jpa.repository.Query("SELECT ia FROM InvoiceApproval ia WHERE ia.invoice.invoiceId = :invoiceId AND ia.status = :status")
    java.util.Optional<InvoiceApproval> findByInvoiceIdAndStatus(Long invoiceId, ApprovalStatus status);
}
