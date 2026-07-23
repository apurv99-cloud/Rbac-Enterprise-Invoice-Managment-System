package com.example.demo.DTO.Organization;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateOrgAdminRequest {

    private String fullName;
    private String email;
    private String password;
}