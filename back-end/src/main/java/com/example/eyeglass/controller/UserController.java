package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.CustomerDTO;
import com.example.eyeglass.service.CustomerService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

        private final CustomerService customerService;

        @GetMapping("/profile")
        public ResponseEntity<?> getProfile(Authentication authentication) {
            CustomerDTO customerDTO = customerService.getUserByEmail(authentication.getName());
            return new ResponseEntity<>(customerDTO, HttpStatus.OK);
        }
}