package com.example.demo.DTO.User;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {

    private Long userId;

    private String fullName;

    private String email;

    private Long organizationId;

    private String organizationName;

    private String roleName;

    private Boolean active;

    private LocalDateTime createdAt;
}