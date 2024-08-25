package com.example.eyeglass.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import com.example.eyeglass.entity.ValidationGroups.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "person")
public class Person extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "full_name")
    @NotBlank(message = "Full name cannot be blank", groups = {Create.class, Update.class})
    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters", groups = {Create.class, Update.class})
    String fullName;

    @Column(unique = true)
    @NotBlank(message = "Email cannot be blank", groups = {Create.class, Update.class, Login.class})
    @Email(regexp = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", message = "Email should be valid",
            groups = {Create.class, Update.class, Login.class})
    String email;

    @Column(name = "phone_number", unique = true)
    String phoneNumber;

    @Column
    String address;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    @NotBlank(message = "Password cannot be blank", groups = {Create.class, Update.class, Login.class})
    @Size(min = 8, max = 50, message = "Password must be between 8 and 50 characters",
            groups = {Create.class, Update.class, Login.class})
    String password;

    @OneToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = Roles.class)
    @JoinColumn(name = "role_id", referencedColumnName = "id", nullable = false)
    Roles roles;

}