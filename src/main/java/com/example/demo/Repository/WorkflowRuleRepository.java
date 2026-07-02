package com.example.demo.Repository;

import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Entity.WorkflowRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkflowRuleRepository extends JpaRepository<WorkflowRule, Long> {
    boolean existsByWorkflow(
            WorkflowMaster workflow);

    Optional<WorkflowRule>
    findByWorkflow(
            WorkflowMaster workflow);

}
