//package com.example.back_end.dto;
//
//import jakarta.validation.constraints.Email;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.Pattern;
//import jakarta.validation.constraints.Size;
//import lombok.Getter;
//import lombok.Setter;
//
//@Getter
//@Setter
//public class UpdateUserDTO {
//
//    private int id;
//
//    @NotBlank(message = "Full name cannot be blank")
//    @Size(min = 3, max = 50, message = "Full name must be between 3 and 50 characters")
//    private String fullname;
//
//    @NotBlank(message = "Email cannot be blank")
//    @Email(message = "Invalid email address")
//    private String email;
//
//    @NotBlank(message = "Phone number cannot be blank")
//    @Pattern(regexp="(&|[0-9]{10})", message = "Phone number must be 10 digits")
//    private String phone_number;
//
//    @NotBlank(message = "Address cannot be blank")
//    @Size(min = 3, max = 100, message = "Address must be between 3 and 100 characters")
//    private String address;
//
//    @NotBlank(message = "Password cannot be blank")
//    @Size(min = 8, max = 50, message = "Password must be between 8 and 50 characters")
//    private String password;
//
//    @NotBlank(message = "Role ID cannot be blank")
//    private String role_id;
//
//}
