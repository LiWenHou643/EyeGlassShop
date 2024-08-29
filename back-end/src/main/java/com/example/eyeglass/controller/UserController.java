package com.example.eyeglass.controller;

import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.service.PersonService;
import lombok.AccessLevel;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/protected")
public class UserController {

    PersonService personService;

    @GetMapping("/user")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        PersonResponse personResponse = personService.getUserByEmail(authentication.getName());
        return new ResponseEntity<>(personResponse, HttpStatus.OK);
    }
}