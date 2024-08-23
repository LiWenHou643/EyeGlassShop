package com.example.eyeglass.controller;

import com.example.eyeglass.dto.user.PersonDTO;
import com.example.eyeglass.service.PersonService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final PersonService personService;

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Authentication authentication) {
        PersonDTO personDTO = personService.getUserByEmail(authentication.getName());
        return new ResponseEntity<>(personDTO, HttpStatus.OK);
    }
}