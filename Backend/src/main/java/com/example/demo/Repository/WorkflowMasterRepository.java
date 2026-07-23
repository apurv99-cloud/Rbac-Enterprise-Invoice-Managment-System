package com.example.demo.Repository;

import com.example.demo.Entity.Organization;
import com.example.demo.Entity.WorkflowMaster;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WorkflowMasterRepository extends JpaRepository<WorkflowMaster, Long> {

    Optional<WorkflowMaster> findByOrganizationAndWorkflowName(
            Organization organization,
            String workflowName
    );
}

