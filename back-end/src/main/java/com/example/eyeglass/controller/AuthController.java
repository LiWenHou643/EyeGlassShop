package com.example.eyeglass.controller;

import com.example.eyeglass.config.JwtUtil;
import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.user.RegisterDTO;
import com.example.eyeglass.dto.user.PersonDTO;
import com.example.eyeglass.dto.user.LoginRequestDTO;
import com.example.eyeglass.dto.user.LoginResponseDTO;
import com.example.eyeglass.service.PersonService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {
    private final PersonService personService;
    private final AuthenticationManager authenticationManager;
    private final Environment env;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody RegisterDTO registerDTO) {

        PersonDTO savedUser = personService.createUser(registerDTO);
        if (savedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @RequestMapping("/user")
    public ResponseEntity<PersonDTO> getUserDetailsAfterLogin(Authentication authentication) {
        PersonDTO person = personService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(person);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@RequestBody LoginRequestDTO loginRequest) {
        String jwt = "";
        // Create an unauthenticated token based on the user's input
        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(),
                loginRequest.password());
        // Authenticate the user
        Authentication authenticationResponse = authenticationManager.authenticate(authentication);
        // If authentication is successful, generate the JWT token
        if (null != authenticationResponse && authenticationResponse.isAuthenticated()) {
            jwt = jwtUtil.generateToken(authenticationResponse.getName(),
                    authenticationResponse.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                                          .collect(Collectors.joining(",")));
        }
        // Return the ResponseEntity with the JWT token in the header and the body
        assert authenticationResponse != null;
        return ResponseEntity.status(HttpStatus.OK).header(EyeGlassConstants.JWT_HEADER, jwt)
                             .body(new LoginResponseDTO(jwt));
    }
}