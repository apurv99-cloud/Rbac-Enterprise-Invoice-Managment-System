package com.example.demo.Configuration;

import com.example.demo.Entity.Role;
import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Entity.WorkflowStep;
import com.example.demo.Repository.RoleRepository;
import com.example.demo.Repository.WorkflowMasterRepository;
import com.example.demo.Repository.WorkflowStepRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
@Order(7)
public class WorkflowStepSeeder
        implements CommandLineRunner {

    private final WorkflowMasterRepository workflowRepository;

    private final WorkflowStepRepository stepRepository;

    private final RoleRepository roleRepository;

    @Override
    public void run(String... args) {

        workflowRepository.findAll()
                .forEach(this::seedSteps);

        System.out.println("Workflow Steps Seeded Successfully.");
    }

    private void seedSteps(
            WorkflowMaster workflow
    ) {

        if (stepRepository.existsByWorkflow(workflow)) {
            return;
        }

        switch (workflow.getWorkflowName()) {

            case "SMALL_WORKFLOW" -> {

                addStep(workflow, 1, "REVIEWER");
            }

            case "MEDIUM_WORKFLOW" -> {

                addStep(workflow, 1, "REVIEWER");
                addStep(workflow, 2, "FINANCE");
            }

            case "LARGE_WORKFLOW" -> {

                addStep(workflow, 1, "REVIEWER");
                addStep(workflow, 2, "FINANCE");
                addStep(workflow, 3, "DIRECTOR");
                addStep(workflow, 4, "CFO");
            }

            default -> throw new RuntimeException(
                    "Unknown Workflow : " + workflow.getWorkflowName());
        }
    }

    private void addStep(
            WorkflowMaster workflow,
            Integer order,
            String roleName
    ) {

        Role role =
                roleRepository.findByRoleName(roleName)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Role not found : " + roleName));

        stepRepository.save(

                WorkflowStep.builder()
                        .workflow(workflow)
                        .stepOrder(order)
                        .role(role)
                        .build()

        );
    }
}