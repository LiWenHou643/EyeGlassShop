package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.CustomerDTO;
import com.example.eyeglass.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @Autowired
    private CustomerService customerService;

    @GetMapping("/test")
    public String test() {
        return "Hello World!";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Im Admin";
    }

    @GetMapping("/user")
    public String user() {
        return "Im User";
    }

    @GetMapping("/myUser")
    public String myUser() {
        return "Hello My USER!";
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        CustomerDTO customerDTO = customerService.getUserByEmail(authentication.getName());
        return new ResponseEntity<>(customerDTO, HttpStatus.OK);
    }
}