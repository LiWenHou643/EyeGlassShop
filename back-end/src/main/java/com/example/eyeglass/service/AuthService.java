package com.example.eyeglass.service;

import com.example.eyeglass.config.jwtAuth.JwtGenerator;
import com.example.eyeglass.constants.EyeGlassConstants;
import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.AuthenticationResponse;
import com.example.eyeglass.dto.response.TokenType;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.entity.RefreshToken;
import com.example.eyeglass.entity.Roles;
import com.example.eyeglass.exception.UserAlreadyExistsException;
import com.example.eyeglass.mapper.UserMapper;
import com.example.eyeglass.repository.PersonRepository;
import com.example.eyeglass.repository.RefreshTokenRepository;
import com.example.eyeglass.repository.RolesRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthService {
    UserMapper UserMapper;
    JwtGenerator jwtGenerator;
    RolesRepository rolesRepository;
    PasswordEncoder passwordEncoder;
    PersonRepository personRepository;
    RefreshTokenRepository refreshTokenRepository;

    public AuthenticationResponse getJwtTokensAfterAuthentication(Authentication authentication, HttpServletResponse response) {
        try {
            var person = personRepository.findByEmail(authentication.getName())
                                         .orElseThrow(() -> {
                                             log.error("[AuthService:userSignInAuth] User :{} not found",
                                                     authentication.getName());
                                             return new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                     "USER NOT FOUND ");
                                         });

            String accessToken = jwtGenerator.generateAccessToken(authentication);
            String refreshToken = jwtGenerator.generateRefreshToken(authentication);

            saveUserRefreshToken(person, refreshToken);

            createTokenCookie(response, refreshToken);

            log.info("[AuthService:userSignInAuth] Access token for user:{}, has been generated",
                    person.getEmail());
            return AuthenticationResponse.builder()
                                         .accessToken(accessToken)
                                         .accessTokenExpiry(5 * 60) // in seconds : 5 minutes
                                         .tokenType(TokenType.Bearer)
                                         .userName(person.getEmail())
                                         .build();
        } catch (Exception e) {
            log.error("[AuthService:userSignInAuth]Exception while authenticating the user due to :" + e.getMessage());
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Please Try Again");
        }
    }

    private void saveUserRefreshToken(Person person, String refreshToken) {
        var refreshTokenEntity = RefreshToken.builder()
                                             .person(person)
                                             .refreshToken(refreshToken)
                                             .revoked(false)
                                             .build();
        refreshTokenRepository.save(refreshTokenEntity);
    }

    private void createTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(15 * 24 * 60 * 60); // in seconds : 15 days
        response.addCookie(refreshTokenCookie);
    }

    public Object getAccessTokenUsingRefreshToken(Authentication authentication) {

        String accessToken = jwtGenerator.generateAccessToken(authentication);

        return AuthenticationResponse.builder()
                                     .accessToken(accessToken)
                                     .accessTokenExpiry(5 * 60) // in seconds : 5 minutes
                                     .tokenType(TokenType.Bearer)
                                     .userName(authentication.getName())
                                     .build();
    }


    public void registerUser(RegisterRequest request) {
        try {
            log.info("[AuthService:registerUser]User Registration Started with :::{}", request);
            Optional<Person> user = personRepository.findByEmail(request.getEmail());
            if (user.isPresent()) {
                throw new UserAlreadyExistsException("Email already exists");
            }

            Person person = UserMapper.toEntityFromRegister(request);
            Roles role = rolesRepository.getRolesByName(EyeGlassConstants.ROLE_USER);
            person.setRoles(role);
            person.setPassword(passwordEncoder.encode(person.getPassword()));

            personRepository.save(person);
        } catch (Exception e) {
            log.error("[AuthService:registerUser]Exception while registering the user due to :" + e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}