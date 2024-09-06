package com.example.eyeglass.config.Authentication;

import com.example.eyeglass.config.RSAKeyRecord;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.utils.JsonUtils;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final RSAKeyRecord rsaKeyRecord;
    private final JwtUtils jwtUtils;

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            String token = authorizationHeader.substring(7);
            JwtDecoder jwtDecoder = NimbusJwtDecoder.withPublicKey(rsaKeyRecord.rsaPublicKey()).build();

            Jwt jwt = jwtDecoder.decode(token);
            boolean isExpired = jwtUtils.isExpired(jwt);
            boolean isInvalidated = jwtUtils.isInvalidated(jwt);

            if (isExpired) {
                throw new AppException(ErrorCode.JWT_EXPIRED);
            } else if (isInvalidated) {
                throw new AppException(ErrorCode.JWT_INVALID);
            } else {
                String username = jwt.getClaim("sub");
                String authorities = jwt.getClaim("scope");
                Authentication authentication = new UsernamePasswordAuthenticationToken(username, null,
                        AuthorityUtils.commaSeparatedStringToAuthorityList(authorities));
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }

            filterChain.doFilter(request, response);
        } catch (JwtException e) {
            ApiResponse(ErrorCode.JWT_INVALID, response);
        } catch (AppException e) {
            ApiResponse(e.getErrorCode(), response);
        } catch (Exception e) {
            ApiResponse(ErrorCode.UNCATEGORIZED_EXCEPTION, response);
        }
    }

    private static void ApiResponse(ErrorCode errorCode, HttpServletResponse response) throws IOException {
        ApiResponse<Void> apiResponse = ApiResponse.<Void>builder()
                                                   .code(errorCode.getCode())
                                                   .message(errorCode.getMessage())
                                                   .build();

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(JsonUtils.toJson(apiResponse));
    }

    @Override
    public boolean shouldNotFilter(HttpServletRequest request) {
        return request.getServletPath().equals("/auth/login") || request.getServletPath().equals("/auth/refresh-token");
    }
}
