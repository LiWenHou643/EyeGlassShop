package com.example.eyeglass.dto.response;

import com.example.eyeglass.entity.Roles;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PersonResponse {

    String fullName;

    String email;

    String phoneNumber;

    String address;

    @JsonIgnore
    String password;

    Roles roles;
}