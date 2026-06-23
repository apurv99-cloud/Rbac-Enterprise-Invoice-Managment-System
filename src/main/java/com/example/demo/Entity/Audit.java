package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "Audit_Logs")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Audit {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long logId;

    private String entityType;

    private Long entityId;

    private String action;

    @ManyToOne
    @JoinColumn(name = "performed_by")
    private Users performedBy;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime actionTime;
}

