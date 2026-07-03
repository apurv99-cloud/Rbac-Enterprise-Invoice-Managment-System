package com.example.demo.Repository;

import com.example.demo.Entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(String roleName);

    @Query("SELECT r FROM Role r WHERE r.active = true AND r.deleted = false " +
           "AND r.roleName NOT IN ('SUPER_ADMIN', 'ORG_ADMIN', 'ROLE_SUPER_ADMIN', 'ROLE_ORG_ADMIN')")
    List<Role> findAssignableRoles();
}
