package com.example.eyeglass.service.auth;

import java.text.ParseException;
import java.util.Date;

import com.example.eyeglass.config.Authentication.JwtGenerator;
import com.example.eyeglass.config.Authentication.JwtUtils;
import com.example.eyeglass.dto.request.AuthenticationRequest;
import com.example.eyeglass.dto.request.IntrospectRequest;
import com.example.eyeglass.dto.request.LogoutRequest;
import com.example.eyeglass.dto.request.RefreshRequest;
import com.example.eyeglass.dto.response.AuthenticationResponse;
import com.example.eyeglass.dto.response.IntrospectResponse;
import com.example.eyeglass.dto.response.TokenType;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.repository.person.PersonRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.*;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    PersonRepository personRepository;
    JwtGenerator jwtGenerator;
    PasswordEncoder passwordEncoder;
    JwtUtils jwtUtils;
    JwtDecoder jwtDecoder;

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.token();
        Jwt jwtToken = jwtDecoder.decode(token);
        boolean isValid = true;

        try {
            jwtUtils.isTokenValid(jwtToken, jwtUtils.getUserName(jwtToken));
        } catch (AppException e) {
            isValid = false;
        }

        return IntrospectResponse.builder().valid(isValid).build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        Person person = personRepository
                .findByEmail(request.username())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.password(), person.getPassword());

        if (!authenticated) throw new AppException(ErrorCode.UNAUTHENTICATED);

        String token = jwtGenerator.generateAccessToken(person);

        return AuthenticationResponse.builder().accessToken(token).accessTokenExpiry(5 * 60)
                                     .tokenType(TokenType.Bearer).username(person.getEmail())
                                     .role(person.getRoles().getName()).build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {


        } catch (AppException exception) {
            log.info("Token already expired");
        }
    }

    public AuthenticationResponse refreshToken(RefreshRequest request) throws ParseException, JOSEException {
        String token = "";
        return AuthenticationResponse.builder().accessToken(token).build();
    }

}