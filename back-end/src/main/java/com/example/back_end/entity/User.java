package com.example.back_end.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@MappedSuperclass
public class User extends BaseEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    private int id;
    private String fullname;
    private String email;
    private String phone_number;
    private String address;
    private String password;
    private String role_id;


}
