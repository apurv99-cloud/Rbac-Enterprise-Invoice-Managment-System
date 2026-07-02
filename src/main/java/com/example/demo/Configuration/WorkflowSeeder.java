package com.example.demo.Configuration;

import com.example.demo.Entity.Organization;
import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Repository.OrganizationRepository;
import com.example.demo.Repository.WorkflowMasterRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(5)
public class WorkflowSeeder
        implements CommandLineRunner {

    private final OrganizationRepository organizationRepository;
    private final WorkflowMasterRepository workflowRepository;

    @Override
    public void run(String... args) {

        organizationRepository.findAll()
                .forEach(this::seedOrganizationWorkflow);

        System.out.println("Workflow Seeder Completed.");
    }

    private void seedOrganizationWorkflow(
            Organization organization
    ) {

        createWorkflow(organization, "SMALL_WORKFLOW");

        createWorkflow(organization, "MEDIUM_WORKFLOW");

        createWorkflow(organization, "LARGE_WORKFLOW");
    }

    private void createWorkflow(
            Organization organization,
            String name
    ) {

        if (workflowRepository
                .findByOrganizationAndWorkflowName(
                        organization,
                        name)
                .isPresent()) {

            return;
        }

        workflowRepository.save(

                WorkflowMaster.builder()
                        .workflowName(name)
                        .organization(organization)
                        .active(true)
                        .deleted(false)
                        .build()

        );
    }
}