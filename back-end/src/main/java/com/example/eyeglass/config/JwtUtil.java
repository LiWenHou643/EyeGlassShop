package com.example.eyeglass.config;

import com.example.eyeglass.repository.InvalidatedTokenRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class JwtUtil {

    @NonFinal
    @Value("${jwt.secret}")
    String secret;

    @NonFinal
    @Value("${jwt.expiration}")
    long jwtExpiration;

    InvalidatedTokenRepository invalidatedTokenRepository;

    public String getJwtFromHeader(String bearerToken) {
        if (null != bearerToken && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String generateToken(String username, String authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("authorities", authorities);
        return createToken(claims, jwtExpiration);
    }

    private String createToken(Map<String, Object> claims, long expiration) {
        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));

        return Jwts.builder()
                   .issuer("Eye Glass")
                   .subject("JWT Token")
                   .claims(claims)
                   .issuedAt(new Date())
                   .expiration(new Date((new Date()).getTime() + expiration))
                   .signWith(secretKey)
                   .compact();
    }

    public Claims getClaims(String bearerToken) {
        String jwt = getJwtFromHeader(bearerToken);
        SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(jwt).getPayload();
    }

    public Date getTokenExpiration(String bearerToken) {
        Claims claims = getClaims(bearerToken);
        return claims.getExpiration();
    }

    public Authentication getAuthenticate(String bearerToken) {
        if (null == bearerToken) {
            return null;
        }

        Claims claims = getClaims(bearerToken);

        String username = String.valueOf(claims.get("username"));
        String authorities = String.valueOf(claims.get("authorities"));

        return new UsernamePasswordAuthenticationToken(username, null,
                AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));
    }
}