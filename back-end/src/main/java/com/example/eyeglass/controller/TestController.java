package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.PersonDTO;
import com.example.eyeglass.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @Autowired
    private PersonService personService;

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

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        PersonDTO personDTO = personService.getUserByEmail(authentication.getName());
        return new ResponseEntity<>(personDTO, HttpStatus.OK);
    }
}