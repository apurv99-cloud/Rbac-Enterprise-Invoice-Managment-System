package com.example.demo.Entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "delegations")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Delegation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long DelegationId;
    @ManyToOne
    @JoinColumn(name = "from_user")
    private Users fromUsers;

    @ManyToOne
    @JoinColumn(name = "to_user")
    private Users toUsers;

    private LocalDate startDate;

    private LocalDate endDate;
}
