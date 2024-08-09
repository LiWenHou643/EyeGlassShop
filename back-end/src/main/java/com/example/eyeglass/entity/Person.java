package com.example.eyeglass.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "user")
public class Person  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fullname")
    private String fullName;

    private String email;

    @Column(name = "phone_number")
    private String phoneNumber;

    private String address;

    private String password;

    @Column(name = "role_id")
    private int roleId;

}
