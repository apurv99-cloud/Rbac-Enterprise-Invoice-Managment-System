package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "workflows")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class WorkflowMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "workflow_id")
    private Long workflowId;

    @Column(nullable = false)
    private String workflowName;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    private Boolean active = true;

    private Boolean deleted = false;
}
