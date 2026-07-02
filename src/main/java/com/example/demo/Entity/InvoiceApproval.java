package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "invoice_approvals")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class InvoiceApproval {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long approvalId;

    @Enumerated(EnumType.STRING)
    private ApprovalStatus status;

    private String comments;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    private Invoice invoice;

    @ManyToOne
    @JoinColumn(name = "stepId")
    private WorkflowStep workflowStep;

    @ManyToOne
    @JoinColumn(name = "approver_id")
    private Users approver;


}
