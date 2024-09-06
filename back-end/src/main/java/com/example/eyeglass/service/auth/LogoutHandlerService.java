package com.example.eyeglass.service.auth;

import com.example.eyeglass.config.RSAKeyRecord;
import com.example.eyeglass.entity.InvalidatedToken;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.repository.auth.InvalidatedTokenRepository;
import com.example.eyeglass.repository.auth.RefreshTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Objects;

@Service
@Slf4j
@RequiredArgsConstructor
public class LogoutHandlerService implements LogoutHandler {

    private final RefreshTokenRepository refreshTokenRepository;
    private final InvalidatedTokenRepository invalidatedTokenRepository;
    private final RSAKeyRecord rsaKeyRecord;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String authenticateHeader = request.getHeader("Authorization");
        if (authenticateHeader != null) {
            authenticateHeader = authenticateHeader.replace("Bearer ", "");
            JwtDecoder jwtDecoder = NimbusJwtDecoder.withPublicKey(rsaKeyRecord.rsaPublicKey()).build();
            Jwt jwt = jwtDecoder.decode(authenticateHeader);
            InvalidatedToken invalidatedToken = new InvalidatedToken();
            invalidatedToken.setToken(authenticateHeader);
            Date expiration = Date.from(Objects.requireNonNull(jwt.getExpiresAt()));
            invalidatedToken.setExpiration(expiration);
            invalidatedTokenRepository.save(invalidatedToken);
        }

        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh_token")) {
                refreshTokenRepository.findByRefreshToken(cookie.getValue())
                                      .map(token -> {
                                          token.setRevoked(true);
                                          refreshTokenRepository.save(token);
                                          return token;
                                      })
                                      .orElseThrow(() -> new AppException(
                                              ErrorCode.REFRESH_TOKEN_INVALID));
            }
        }

        Cookie refreshTokenCookie = new Cookie("refresh_token", null);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(0);
        response.addCookie(refreshTokenCookie);

        SecurityContextHolder.clearContext();
    }
}