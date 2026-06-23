package com.example.demo.Repository;

import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.InvoiceDocument;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceDocumentRepository extends JpaRepository<InvoiceDocument, Long> {
    List<InvoiceDocument> findByInvoice(Invoice invoice);
}
