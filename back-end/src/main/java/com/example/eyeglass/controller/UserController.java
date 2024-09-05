package com.example.eyeglass.controller;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserController {

    @GetMapping("/test")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public String getUser() {
        Authentication a = SecurityContextHolder.getContext().getAuthentication();
        return "Hello User";
    }
}