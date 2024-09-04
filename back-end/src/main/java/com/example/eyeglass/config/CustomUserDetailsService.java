package com.example.eyeglass.config;

import com.example.eyeglass.entity.Person;
import com.example.eyeglass.repository.person.PersonRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final PersonRepository personRepository;

    @Override
    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
        return personRepository.findByEmail(email)
                               .map()
                               .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
    }

    private UserDetails mapToUserDetails(Person person) {
        // Convert roles to GrantedAuthority
        List<GrantedAuthority> authorities = person.getRoles().stream()
                                                   .map(SimpleGrantedAuthority::new)
                                                   .collect(Collectors.toList());

        // Return UserDetails
        return new User(person.getEmail(), person.getPassword(), authorities);
    }
}
