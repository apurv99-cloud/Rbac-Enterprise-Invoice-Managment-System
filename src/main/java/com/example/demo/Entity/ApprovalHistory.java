package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "approval_histories")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ApprovalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long historyId;
    private String action;
    private String comments;

    @ManyToOne
    @JoinColumn(name = "approval_id")
    private InvoiceApproval approval;

    @ManyToOne
    @JoinColumn(name = "performed_by")
    private Users performedBy;

    private LocalDateTime actionTime;
}
