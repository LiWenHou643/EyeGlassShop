package com.example.eyeglass.controller;

import com.example.eyeglass.entity.Person;
import com.example.eyeglass.repository.person.PersonRepository;
import com.example.eyeglass.service.person.PersonService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
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
    private final PersonRepository personRepository;

    //    @PreAuthorize("hasAuthority('SCOPE_USER')")
    @GetMapping
    public Person getUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return personRepository.findById((long) 10).orElse(null);
    }
}