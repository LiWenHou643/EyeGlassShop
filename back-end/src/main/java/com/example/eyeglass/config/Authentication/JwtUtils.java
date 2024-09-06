package com.example.eyeglass.config.Authentication;

import com.example.eyeglass.repository.auth.InvalidatedTokenRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtUtils {
    private final InvalidatedTokenRepository invalidatedTokenRepository;

    public boolean isExpired(Jwt jwtToken) {
        return Objects.requireNonNull(jwtToken.getExpiresAt()).isBefore(Instant.now());
    }

    public boolean isInvalidated(Jwt jwtToken) {
        return invalidatedTokenRepository.existsByToken(jwtToken.getTokenValue());
    }

    public boolean isValid(Jwt jwtToken) {
        return !isExpired(jwtToken) && !isInvalidated(jwtToken);
    }
}

