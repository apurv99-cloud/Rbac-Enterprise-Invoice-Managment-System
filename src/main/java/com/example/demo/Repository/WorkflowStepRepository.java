package com.example.demo.Repository;

import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Entity.WorkflowStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkflowStepRepository extends JpaRepository<WorkflowStep, Long> {
    boolean existsByWorkflow(
            WorkflowMaster workflow);

    List<WorkflowStep>
    findByWorkflowOrderByStepOrderAsc(
            WorkflowMaster workflow);
}
