package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.CreateUserDTO;
import com.example.eyeglass.dto.user.CustomerDTO;
import com.example.eyeglass.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/register")
public class UserController {

    private final CustomerService customerService;

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {

        CustomerDTO savedUser = customerService.createUser(createUserDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

}