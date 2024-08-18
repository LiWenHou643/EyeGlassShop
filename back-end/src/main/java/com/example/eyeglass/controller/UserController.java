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
@RequestMapping("/api/user")
public class UserController {

}