package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "invoice_documents")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InvoiceDocument {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long documentId;
    private String fileName;
    private String fileUrl;

    @ManyToOne
    @JoinColumn(name = "invoiceId")
    private Invoice invoice;
}
