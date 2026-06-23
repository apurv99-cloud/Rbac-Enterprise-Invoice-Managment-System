package com.example.demo.Repository;

import com.example.demo.Entity.Organization;
import com.example.demo.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<Users, Long> {
    Optional<Users> findByEmail(String email);

    boolean existsByEmail(String email);

    List<Users> findByOrganization(Organization organization);

    List<Users> findByDeletedFalse();
}
