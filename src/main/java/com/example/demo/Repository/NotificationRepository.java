package com.example.demo.Repository;

import com.example.demo.Entity.Notifications;
import com.example.demo.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {
    List<Notifications> findByUsers(Users users);
}
