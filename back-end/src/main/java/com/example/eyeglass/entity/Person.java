package com.example.eyeglass.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.example.eyeglass.entity.ValidationGroups.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "person")
public class Person extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name")
    @NotBlank(message = "Full name cannot be blank", groups = {Create.class, Update.class})
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters", groups = {Create.class, Update.class})
    private String fullName;

    @Column(unique = true)
    @NotBlank(message = "Email cannot be blank", groups = {Create.class, Update.class, Login.class})
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email should be valid",
            groups = {Create.class, Update.class, Login.class})
    private String email;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;

    @Column
    private String address;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password cannot be blank", groups = {Create.class, Update.class, Login.class})
    @Size(min = 8, max = 50, message = "Password must be between 8 and 50 characters",
            groups = {Create.class, Update.class, Login.class})
    private String password;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = Roles.class)
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
    private Roles roles;

}