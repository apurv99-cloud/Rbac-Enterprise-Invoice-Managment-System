package com.example.demo.Repository;

import com.example.demo.Entity.WorkFlowRule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.Optional;

public interface WorkFlowRuleRepository extends JpaRepository<WorkFlowRule, Long> {

    Optional<WorkFlowRule>
    findByMinAmountLessThanEqualAndMaxAmountGreaterThanEqual(
            BigDecimal amount1,
            BigDecimal amount2
    );
}
