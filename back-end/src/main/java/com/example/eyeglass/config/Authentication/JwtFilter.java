package com.example.eyeglass.config.Authentication;

import com.example.eyeglass.config.RSAKeyRecord;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final RSAKeyRecord rsaKeyRecord;
    private final JwtUtils jwtUtils;
    private final String[] publicEndpoints;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, @NonNull FilterChain filterChain)
            throws ServletException, IOException {

        String requestURI = request.getRequestURI();
        AntPathMatcher antPathMatcher = new AntPathMatcher();

        for (String publicEndpoint : publicEndpoints) {
            boolean isPublicEndpoint = antPathMatcher.match(publicEndpoint, requestURI);

            if (isPublicEndpoint) {
                filterChain.doFilter(request, response);
                return;
            }
        }


        try {
            String authorizationHeader = request.getHeader("Authorization");
            if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
                throw new AppException(ErrorCode.JWT_INVALID);
            }

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
            
        } catch (AppException e) {
            ApiResponse<Void> errorResponse = new ApiResponse<>();
            errorResponse.setCode(e.getErrorCode().getCode());
            errorResponse.setMessage(e.getErrorCode().getMessage());

            responseException(response, errorResponse);

        } catch (JwtException e) {
            ApiResponse<Void> errorResponse = new ApiResponse<>();
            if (isTokenExpired(e)) {
                errorResponse.setCode(ErrorCode.JWT_EXPIRED.getCode());
                errorResponse.setMessage(ErrorCode.JWT_EXPIRED.getMessage());
            } else {
                errorResponse.setCode(ErrorCode.JWT_INVALID.getCode());
                errorResponse.setMessage(ErrorCode.JWT_INVALID.getMessage());
            }

            responseException(response, errorResponse);

        } catch (Exception e) {
            ApiResponse<Void> errorResponse = new ApiResponse<>();
            errorResponse.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
            errorResponse.setMessage(e.getMessage());

            responseException(response, errorResponse);
        }
    }

    private void responseException(HttpServletResponse response, ApiResponse<Void> errorResponse) throws IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(convertObjectToJson(errorResponse));
    }

    private boolean isTokenExpired(JwtException e) {
        String errorMessage = e.getMessage();
        return errorMessage != null && errorMessage.toLowerCase().contains("expired");
    }

    public String convertObjectToJson(Object object) throws JsonProcessingException {
        if (object == null) {
            return null;
        }
        ObjectMapper mapper = new ObjectMapper();
        return mapper.writeValueAsString(object);
    }
}
