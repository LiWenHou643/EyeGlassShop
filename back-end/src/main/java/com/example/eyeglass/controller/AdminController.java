package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.CustomerDTO;
import com.example.eyeglass.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin")
public class AdminController {

    private final CustomerService customerService;

    @GetMapping("/users")
    public ResponseEntity<?> getAllUsers() {
        List<CustomerDTO> customerDTOS = customerService.getAllUsers();
        return new ResponseEntity<>(customerDTOS, HttpStatus.OK);
    }

    @GetMapping("/user/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        CustomerDTO customerDTO = customerService.getUserById(id);
        return new ResponseEntity<>(customerDTO, HttpStatus.OK);
    }

    @PutMapping("/user/{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @Valid @RequestBody CustomerDTO customerDTO) {
        CustomerDTO updatedUser = customerService.updateUser(id, customerDTO);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}