package com.example.demo.Repository;

import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.InvoiceApproval;
import com.example.demo.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceApprovalRepository extends JpaRepository<InvoiceApproval, Long> {
    List<InvoiceApproval> findByInvoice(Invoice invoice);

    List<InvoiceApproval> findByApprover(Users approver);
}
