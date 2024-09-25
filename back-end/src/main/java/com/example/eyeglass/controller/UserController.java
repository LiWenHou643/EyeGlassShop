package com.example.eyeglass.controller;

import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.service.person.PersonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/user")
public class UserController {

    PersonService personService;

    @PreAuthorize("hasAuthority('SCOPE_USER')")
    @GetMapping
    public ApiResponse<PersonResponse> getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        ApiResponse<PersonResponse> response = new ApiResponse<>();
        response.setMessage("User get successfully");
        response.setData(personService.getPersonByEmail(username));
        return response;
    }
}