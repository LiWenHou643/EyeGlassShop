package com.example.eyeglass.controller;

import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.user.RegisterDTO;
import com.example.eyeglass.dto.user.PersonDTO;
import com.example.eyeglass.dto.user.LoginRequestDTO;
import com.example.eyeglass.dto.user.LoginResponseDTO;
import com.example.eyeglass.service.PersonService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
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

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {
    private final PersonService personService;
    private final AuthenticationManager authenticationManager;
    private final Environment env;

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
            if (null != env) {
                String secret = env.getProperty(EyeGlassConstants.JWT_SECRET_KEY,
                        EyeGlassConstants.JWT_SECRET_DEFAULT_VALUE);
                SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
                jwt = Jwts.builder().issuer("Eye GLass").subject("JWT Token")
                          .claim("username", authenticationResponse.getName())
                          .claim("authorities", authenticationResponse.getAuthorities().stream().map(
                                  GrantedAuthority::getAuthority).collect(Collectors.joining(",")))
                          .issuedAt(new Date())
                          .expiration(new Date((new Date()).getTime() + 30000000))
                          .signWith(secretKey).compact();
            }
        }
        // Return the ResponseEntity with the JWT token in the header and the body
        assert authenticationResponse != null;
        return ResponseEntity.status(HttpStatus.OK).header(EyeGlassConstants.JWT_HEADER, jwt)
                             .body(new LoginResponseDTO(jwt));
    }
}