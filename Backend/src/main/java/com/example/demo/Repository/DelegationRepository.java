package com.example.demo.Repository;

import com.example.demo.Entity.Delegation;
import com.example.demo.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DelegationRepository extends JpaRepository<Delegation, Long> {
    List<Delegation> findByFromUsers(Users fromUsers);

    List<Delegation> findByToUsers(Users toUsers);

}
