package com.example.eyeglass.dto.user;

import com.example.eyeglass.entity.Roles;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {

    private String fullName;

    private String email;

    private String phoneNumber;

    private String address;

    @JsonIgnore
    private String password;

    private Roles roles;
}