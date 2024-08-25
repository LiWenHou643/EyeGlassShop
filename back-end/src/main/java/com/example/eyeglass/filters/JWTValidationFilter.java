package com.example.eyeglass.filters;

import com.example.eyeglass.config.JwtUtil;
import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.repository.InvalidatedTokenRepository;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class JWTValidationFilter extends OncePerRequestFilter {
    JwtUtil jwtUtil;
    InvalidatedTokenRepository invalidatedTokenRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain) throws ServletException, IOException {
        String header = request.getHeader(EyeGlassConstants.JWT_HEADER);
        if (null == header || !header.startsWith(EyeGlassConstants.JWT_PREFIX)) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = jwtUtil.getJwtFromHeader(header);
            boolean isInvalidated = invalidatedTokenRepository.existsById(token);
            if (isInvalidated) {
                throw new BadCredentialsException("Token is invalidated!");
            }

            Authentication authentication = jwtUtil.getAuthenticate(header);
            SecurityContextHolder.getContext().setAuthentication(authentication);

        } catch (JwtException | IllegalArgumentException e) {
            throw new BadCredentialsException("Invalid Token received!", e);
        }

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getServletPath();
        return path.equals("/api/login");
    }
}