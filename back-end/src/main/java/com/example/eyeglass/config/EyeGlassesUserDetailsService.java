package com.example.eyeglass.config;

import com.example.eyeglass.entity.Person;
import com.example.eyeglass.repository.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EyeGlassesUserDetailsService implements UserDetailsService {

    private final PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Person person = personRepository.findByEmail(username).orElseThrow(() -> new
                UsernameNotFoundException("User details not found for the user: %s".formatted(username)));
        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(person.getRoles().getName()));

        return new User(person.getEmail(), person.getPassword(), authorities);
    }
}