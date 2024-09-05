package com.example.eyeglass.config.Authentication;

import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtUtils {

    public boolean isTokenValid(Jwt jwtToken) {
        boolean isTokenExpired = getIfTokenIsExpired(jwtToken);
        return !isTokenExpired;
    }

    private boolean getIfTokenIsExpired(Jwt jwtToken) {
        return Objects.requireNonNull(jwtToken.getExpiresAt()).isBefore(Instant.now());
    }

}

