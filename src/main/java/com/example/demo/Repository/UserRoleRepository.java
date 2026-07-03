package com.example.demo.Repository;

import com.example.demo.Entity.Organization;
import com.example.demo.Entity.Role;
import com.example.demo.Entity.Users;
import com.example.demo.Entity.Users_Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRoleRepository extends JpaRepository<Users_Role, Long> {
    List<Users_Role> findByUsers(Users users);

    Optional<Users_Role> findFirstByUsers(Users users);

//    Optional<Users_Role>
//    findFirstByRole(
//            Role role
//    );

    Optional<Users_Role>
    findFirstByRoleAndUsers_Organization(
            Role role,
            Organization organization
    );
}
