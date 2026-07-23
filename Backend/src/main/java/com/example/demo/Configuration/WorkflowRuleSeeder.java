package com.example.demo.Configuration;

import com.example.demo.Entity.WorkflowMaster;
import com.example.demo.Entity.WorkflowRule;
import com.example.demo.Repository.WorkflowMasterRepository;
import com.example.demo.Repository.WorkflowRuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@RequiredArgsConstructor
@Order(6)
public class WorkflowRuleSeeder
        implements CommandLineRunner {

    private final WorkflowMasterRepository workflowRepository;

    private final WorkflowRuleRepository ruleRepository;

    @Override
    public void run(String... args) {

        workflowRepository.findAll()
                .forEach(this::seedRule);

        System.out.println("Workflow Rules Seeded Successfully.");
    }

    private void seedRule(
            WorkflowMaster workflow
    ) {

        if (ruleRepository.existsByWorkflow(workflow)) {
            return;
        }

        switch (workflow.getWorkflowName()) {

            case "SMALL_WORKFLOW" -> ruleRepository.save(

                    WorkflowRule.builder()
                            .workflow(workflow)
                            .minAmount(BigDecimal.ZERO)
                            .maxAmount(new BigDecimal("50000"))
                            .build()

            );

            case "MEDIUM_WORKFLOW" -> ruleRepository.save(

                    WorkflowRule.builder()
                            .workflow(workflow)
                            .minAmount(new BigDecimal("50001"))
                            .maxAmount(new BigDecimal("500000"))
                            .build()

            );

            case "LARGE_WORKFLOW" -> ruleRepository.save(

                    WorkflowRule.builder()
                            .workflow(workflow)
                            .minAmount(new BigDecimal("500001"))
                            .maxAmount(new BigDecimal("999999999"))
                            .build()

            );

            default -> throw new RuntimeException(
                    "Unknown Workflow : "
                            + workflow.getWorkflowName());
        }
    }
}