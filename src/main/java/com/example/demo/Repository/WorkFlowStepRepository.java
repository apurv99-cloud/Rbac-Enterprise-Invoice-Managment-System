package com.example.demo.Repository;

import com.example.demo.Entity.WorkFlowMaster;
import com.example.demo.Entity.WorkFlowStep;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkFlowStepRepository extends JpaRepository<WorkFlowStep, Long> {
    List<WorkFlowStep>
    findByWorkflowOrderByStepOrderAsc(
            WorkFlowMaster workflow
    );
}
