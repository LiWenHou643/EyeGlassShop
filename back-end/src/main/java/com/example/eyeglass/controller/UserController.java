package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.CreateUserDTO;
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
@RequestMapping("/api/users")
public class UserController {

    private final CustomerService customerService;

    @GetMapping("/all")
    @ResponseBody
    public ResponseEntity<?> getAllUsers() {
        List<CustomerDTO> customerDTOS = customerService.getAllUsers();
        return new ResponseEntity<>(customerDTOS, HttpStatus.OK);
    }

    @GetMapping("{id}")
    @ResponseBody
    public ResponseEntity<?> getUserById(@PathVariable("id") Long id) {
        CustomerDTO customerDTO = customerService.getUserById(id);
        return new ResponseEntity<>(customerDTO, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserDTO createUserDTO) {

        CustomerDTO savedUser = customerService.createUser(createUserDTO);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @PutMapping("{id}")
    public ResponseEntity<?> updateUser(@PathVariable("id") Long id, @Valid @RequestBody CustomerDTO customerDTO) {
        CustomerDTO updatedUser = customerService.updateUser(id, customerDTO);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }
}