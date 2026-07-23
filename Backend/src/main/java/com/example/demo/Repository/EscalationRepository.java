package com.example.demo.Repository;

import com.example.demo.Entity.Escalation;
import com.example.demo.Entity.WorkflowStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EscalationRepository extends JpaRepository<Escalation, Long> {
    Optional<Escalation>
    findByWorkflowStep(WorkflowStep workflowStep);
}
