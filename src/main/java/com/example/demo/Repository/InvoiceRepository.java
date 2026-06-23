package com.example.demo.Repository;

import com.example.demo.Entity.Invoice;
import com.example.demo.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InvoiceRepository extends JpaRepository<Invoice, Long> {
    List<Invoice> findByVendor(Users vendor);
}
