package com.example.eyeglass.dto.response;

import com.example.eyeglass.entity.Address;
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
    Long id;

    String fullName;

    String email;

    String phoneNumber;

    Address address;

    @JsonIgnore
    String password;

    Roles roles;

    String image;
}