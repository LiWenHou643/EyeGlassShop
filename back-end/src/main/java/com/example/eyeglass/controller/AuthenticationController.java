package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.AuthenticationRequest;
import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.AuthenticationResponse;
import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.entity.ValidationGroups.Create;
import com.example.eyeglass.entity.ValidationGroups.Login;
import com.example.eyeglass.service.auth.AuthenticationService;
import com.example.eyeglass.service.auth.LogoutHandlerService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
@RequestMapping("/auth")
public class AuthenticationController {
    AuthenticationService authenticationService;
    private final LogoutHandlerService logoutHandlerService;

    @PostMapping("/login")
    public ApiResponse<AuthenticationResponse> authenticateUser(
            @Validated(Login.class) @RequestBody AuthenticationRequest authenticationRequest,
            HttpServletResponse response) {

        ApiResponse<AuthenticationResponse> res = new ApiResponse<>();
        res.setMessage("User authenticated successfully");
        res.setData(authenticationService.authenticate(authenticationRequest, response));
        return res;
    }

    @PostMapping("/register")
    public ApiResponse<PersonResponse> registerUser(@Validated(Create.class) @RequestBody RegisterRequest request) {
        ApiResponse<PersonResponse> res = new ApiResponse<>();
        res.setMessage("User registered successfully");
        res.setData(authenticationService.register(request));
        return res;
    }

    @GetMapping("/logout")
    public ApiResponse<String> logoutUser(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        logoutHandlerService.logout(request, response, authentication);
        ApiResponse<String> res = new ApiResponse<>();
        res.setMessage("User logged out successfully");
        return res;
    }

    @GetMapping("/refresh")
    public ApiResponse<AuthenticationResponse> refreshToken(HttpServletRequest request) {
        ApiResponse<AuthenticationResponse> res = new ApiResponse<>();
        res.setMessage("Token refreshed successfully");
        res.setData(authenticationService.refreshToken(request));
        return res;
    }
}