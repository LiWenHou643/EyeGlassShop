package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.AuthenticationRequest;
import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.AuthenticationResponse;
import com.example.eyeglass.service.auth.AuthService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.example.eyeglass.entity.ValidationGroups.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/api/auth")
public class AuthController {
    AuthService authService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> authenticateUser(@Validated(Login.class) @RequestBody AuthenticationRequest authenticationRequest, HttpServletResponse response) {

        ApiResponse<AuthenticationResponse> res = new ApiResponse<>();
        res.setMessage("User authenticated successfully");
        res.setData(authService.getJwtTokensAfterAuthentication(authenticationResponse, response));
        return res;
    }

    @PreAuthorize("hasAuthority('SCOPE_REFRESH_TOKEN')")
    @PostMapping("/refresh-token")
    public ResponseEntity<?> getRefreshAccessToken() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok(authService.getAccessTokenUsingRefreshToken(authentication));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Validated(Create.class) @RequestBody RegisterRequest request,
            BindingResult bindingResult) {

        log.info("[AuthController:registerUser]Signup Process Started for user:{}", request.getEmail());
        if (bindingResult.hasErrors()) {
            List<String> errorMessage = bindingResult.getAllErrors().stream()
                                                     .map(DefaultMessageSourceResolvable::getDefaultMessage)
                                                     .toList();
            log.error("[AuthController:registerUser]Errors in user:{}", errorMessage);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
        authService.registerUser(request);
        return ResponseEntity.ok("User registered successfully");
    }
}