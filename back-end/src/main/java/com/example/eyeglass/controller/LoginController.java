package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.CreateUserDTO;
import com.example.eyeglass.dto.user.CustomerDTO;
import com.example.eyeglass.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class LoginController {
    private final CustomerService customerService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam(value = "error", required = false) String error) {
        if (error != null) {
            return ResponseEntity.badRequest().body("Username or Password is incorrect");
        }
        return ResponseEntity.ok("Login Success");
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {

        CustomerDTO savedUser = customerService.createUser(createUserDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }
}