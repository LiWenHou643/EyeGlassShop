package com.example.eyeglass.config;

import com.example.eyeglass.constants.EyeGlassConstants;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    private final Environment environment;

    public String generateToken(String username, String authorities) {
        if (null != environment) {
            String secret = environment.getProperty(EyeGlassConstants.JWT_SECRET_KEY,
                    EyeGlassConstants.JWT_SECRET_DEFAULT_VALUE);
            SecretKey secretKey = Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
            return Jwts.builder()
                       .issuer("Eye Glass")
                       .subject("JWT Token")
                       .claim("username", username)
                       .claim("authorities", authorities)
                       .issuedAt(new Date())
                       .expiration(new Date((new Date()).getTime() + 5000))
                       .signWith(secretKey)
                       .compact();
        }
        return null;
    }
}