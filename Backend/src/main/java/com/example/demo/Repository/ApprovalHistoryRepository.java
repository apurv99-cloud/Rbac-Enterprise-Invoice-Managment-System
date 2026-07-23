package com.example.demo.Repository;

import com.example.demo.Entity.ApprovalHistory;
import com.example.demo.Entity.InvoiceApproval;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ApprovalHistoryRepository extends JpaRepository<ApprovalHistory, Long> {
    List<ApprovalHistory>
    findByApproval(InvoiceApproval approval);

}
