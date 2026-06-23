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
public class WorkFlowMaster {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long workFlowId;

    @Column(nullable = false)
    private String workFlowName;

    @ManyToOne
    @JoinColumn(name = "organization_id")
    private Organization organization;

    private Boolean active = true;

    private Boolean deleted = false;
}
