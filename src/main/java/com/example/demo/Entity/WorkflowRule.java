package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.math.BigDecimal;

@Entity
@Table(name = "WorkFlow_Rules")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkflowRule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name ="rule_id")
    private Long ruleId;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal minAmount;
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal maxAmount;

    @ManyToOne
    @JoinColumn(name = "workFlowId")
    private WorkflowMaster workflow;


}
