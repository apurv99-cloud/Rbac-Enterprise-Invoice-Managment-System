package com.example.demo.Repository;

import com.example.demo.Entity.Audit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuditLogRepository extends JpaRepository<Audit, Long> {
}
