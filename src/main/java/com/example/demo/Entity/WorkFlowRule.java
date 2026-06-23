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
public class WorkFlowRule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rule_id;

    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal minAmount;
    @Column(nullable = false, precision = 19, scale = 2)
    private BigDecimal maxAmount;

    @ManyToOne
    @JoinColumn(name = "workFlowId")
    private WorkFlowMaster workFlowMaster;


}
