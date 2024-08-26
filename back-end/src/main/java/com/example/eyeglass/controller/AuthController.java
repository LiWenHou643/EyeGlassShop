package com.example.eyeglass.controller;

import com.example.eyeglass.config.JwtUtil;
import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.dto.request.LoginRequest;
import com.example.eyeglass.dto.response.AuthenticationResponse;
import com.example.eyeglass.entity.InvalidatedToken;
import com.example.eyeglass.exception.CustomAuthenticationException;
import com.example.eyeglass.repository.InvalidatedTokenRepository;
import com.example.eyeglass.service.PersonService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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


    @GetMapping("/user")
    public ResponseEntity<PersonResponse> getUserDetailsAfterLogin(@RequestHeader(value = "Authorization") String request) {
        if (request == null || request.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        Claims claims = jwtUtil.getClaims(request);
        String username = String.valueOf(claims.get("username"));
        PersonResponse person = personService.getUserByEmail(username);
        return ResponseEntity.status(HttpStatus.OK).body(person);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        String jwt = "";
        try {
            // Create an unauthenticated token based on the user's input
            Authentication authentication = UsernamePasswordAuthenticationToken.unauthenticated(loginRequest.username(),
                    loginRequest.password());
            // Authenticate the user
            Authentication authenticationResponse = authenticationManager.authenticate(authentication);

            // If authentication is successful, generate the JWT token
            String name = authenticationResponse.getName();
            String authorities = authenticationResponse.getAuthorities().stream()
                                                       .map(GrantedAuthority::getAuthority)
                                                       .collect(Collectors.joining(","));
            jwt = jwtUtil.generateToken(name, authorities);

            // Create a cookie with the JWT token
            Cookie cookie = new Cookie("token", jwt);
            cookie.setHttpOnly(true);  // Helps prevent XSS attacks
            cookie.setSecure(true);    // Ensures the cookie is only sent over HTTPS
            cookie.setPath("/");       // The cookie is valid for the entire domain
            cookie.setMaxAge(3600);    // Cookie expiration time in seconds (1 hour)

            response.addCookie(cookie);  // Add the cookie to the response

            // Return the ResponseEntity with the JWT token in the response body
            return ResponseEntity.status(HttpStatus.OK).header(EyeGlassConstants.JWT_HEADER, jwt)
                                 .body(new AuthenticationResponse(jwt, true, "Login successfully"));


        } catch (CustomAuthenticationException e) {
            // Handle custom authentication exception
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                 .body(new AuthenticationResponse(jwt, false, e.getMessage()));
        } catch (Exception e) {
            // Handle other exceptions
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(new AuthenticationResponse(jwt, false, e.getMessage()));
        }

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
                             .body(new AuthenticationResponse(newJwt, true, "Refresh successfully"));
    }

}