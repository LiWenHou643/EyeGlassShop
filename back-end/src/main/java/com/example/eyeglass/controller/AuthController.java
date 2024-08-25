package com.example.eyeglass.controller;

import com.example.eyeglass.config.JwtUtil;
import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.dto.request.LoginRequest;
import com.example.eyeglass.dto.response.AuthenticationResponse;
import com.example.eyeglass.entity.InvalidatedToken;
import com.example.eyeglass.repository.InvalidatedTokenRepository;
import com.example.eyeglass.service.PersonService;
import io.jsonwebtoken.Claims;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api")
public class AuthController {
    JwtUtil jwtUtil;
    PersonService personService;
    AuthenticationManager authenticationManager;
    InvalidatedTokenRepository invalidatedTokenRepository;

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody RegisterRequest registerRequest) {

        PersonResponse savedUser = personService.createUser(registerRequest);
        if (savedUser == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }


    @RequestMapping("/user")
    public ResponseEntity<PersonResponse> getUserDetailsAfterLogin(Authentication authentication) {
        PersonResponse person = personService.getUserByEmail(authentication.getName());
        return ResponseEntity.ok(person);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest) {
        String jwt = "";
        // Create an unauthenticated token based on the user's input
        Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(),
                loginRequest.password());
        // Authenticate the user
        Authentication authenticationResponse = authenticationManager.authenticate(authentication);
        // If authentication is successful, generate the JWT token
        if (null != authenticationResponse && authenticationResponse.isAuthenticated()) {
            String name = authenticationResponse.getName();
            String authorities = authenticationResponse.getAuthorities().stream().map(GrantedAuthority::getAuthority)
                                                       .collect(Collectors.joining(","));
            jwt = jwtUtil.generateToken(name, authorities);
        }
        // Return the ResponseEntity with the JWT token in the header and the body
        assert authenticationResponse != null;
        return ResponseEntity.status(HttpStatus.OK).header(EyeGlassConstants.JWT_HEADER, jwt)
                             .body(new AuthenticationResponse(jwt));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestHeader(value = "Authorization") String request) {

        String token = jwtUtil.getJwtFromHeader(request);
        Date tokenExpiration = jwtUtil.getTokenExpiration(request);

        InvalidatedToken invalidatedToken = InvalidatedToken.builder().id(token).expiration(tokenExpiration).build();

        invalidatedTokenRepository.save(invalidatedToken);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthenticationResponse> refresh(@RequestHeader(value = "Authorization") String request) {
        String token = jwtUtil.getJwtFromHeader(request);
        Date tokenExpiration = jwtUtil.getTokenExpiration(request);

        InvalidatedToken invalidatedToken = InvalidatedToken.builder().id(token).expiration(tokenExpiration).build();
        invalidatedTokenRepository.save(invalidatedToken);

        Claims claims = jwtUtil.getClaims(request);

        String username = String.valueOf(claims.get("username"));
        String authorities = String.valueOf(claims.get("authorities"));

        String newJwt = jwtUtil.generateToken(username, authorities);

        return ResponseEntity.status(HttpStatus.OK).header(EyeGlassConstants.JWT_HEADER, newJwt)
                             .body(new AuthenticationResponse(newJwt));
    }

}