package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "escalation_rules")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Escalation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long escalation_id;

    private Integer escalationHours;

    @ManyToOne
    @JoinColumn(name = "workflow_step_id")
    private WorkflowStep workflowStep;

    @ManyToOne
    @JoinColumn(name = "escalate_to_role")
    private Role escalateToRole;
}
