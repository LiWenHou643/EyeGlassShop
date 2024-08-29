package com.example.eyeglass.config.user;

import com.example.eyeglass.repository.PersonRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class EyeGlassesUserDetailsService implements UserDetailsService {

    PersonRepository personRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return personRepository.findByEmail(username)
                               .map(UserInfoConfig::new)
                               .orElseThrow(() -> new
                                       UsernameNotFoundException(
                                       "User details not found for the user: %s".formatted(username)));

    }
}