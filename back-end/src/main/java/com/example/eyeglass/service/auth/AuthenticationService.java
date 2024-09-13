package com.example.eyeglass.service.auth;

import com.example.eyeglass.config.Authentication.JwtGenerator;
import com.example.eyeglass.constants.AppConstants;
import com.example.eyeglass.dto.request.AuthenticationRequest;
import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.AuthenticationResponse;
import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.dto.response.TokenType;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.entity.RefreshToken;
import com.example.eyeglass.entity.Roles;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.repository.auth.RefreshTokenRepository;
import com.example.eyeglass.repository.person.PersonRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import static com.example.eyeglass.mapper.PersonMapper.PERSON_MAPPER;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    JwtGenerator jwtGenerator;
    PasswordEncoder passwordEncoder;
    PersonRepository personRepository;
    RefreshTokenRepository refreshTokenRepository;

    public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
        Person person = personRepository
                .findByEmail(request.username())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_EXISTED));

        boolean authenticated = passwordEncoder.matches(request.password(), person.getPassword());
        if (!authenticated) throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);

        String token = jwtGenerator.generateAccessToken(person);
        String refreshToken = jwtGenerator.generateRefreshToken(person);

        saveUserRefreshToken(person, refreshToken);
        createRefreshTokenCookie(response, refreshToken);

        return AuthenticationResponse.builder().accessToken(token).accessTokenExpiry(5 * 60)
                                     .tokenType(TokenType.Bearer).username(person.getEmail())
                                     .role(person.getRoles().getName()).build();
    }

    private void saveUserRefreshToken(Person person, String refreshToken) {
        var refreshTokenEntity = RefreshToken.builder()
                                             .person(person)
                                             .refreshToken(refreshToken)
                                             .revoked(false)
                                             .build();
        refreshTokenRepository.save(refreshTokenEntity);
    }

    private void createRefreshTokenCookie(HttpServletResponse response, String refreshToken) {
        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(15 * 24 * 60 * 60); // in seconds (15 days)
        response.addCookie(refreshTokenCookie);
    }

    public PersonResponse register(RegisterRequest request) {
        Roles role = Roles.builder().name(AppConstants.ROLE_USER).build();

        request.setFullName(request.getFullName().trim());
        request.setEmail(request.getEmail().trim());
        request.setPassword(request.getPassword().trim());

        Person personExist = personRepository.findByEmail(request.getEmail()).orElse(null);
        if (personExist != null) throw new AppException(ErrorCode.USER_EXISTED);

        Person person = Person.builder()
                              .fullName(request.getFullName())
                              .email(request.getEmail())
                              .password(passwordEncoder.encode(request.getPassword()))
                              .roles(role)
                              .build();
        Person isSaved = personRepository.save(person);

        return PERSON_MAPPER.toPersonResponse(isSaved);
    }

    public AuthenticationResponse refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = getRefreshToken(request);

        RefreshToken token = refreshTokenRepository.findByRefreshToken(refreshToken)
                                                   .orElseThrow(() -> new AppException(
                                                           ErrorCode.REFRESH_TOKEN_INVALID));
        if (token.isRevoked()) {
            throw new AppException(ErrorCode.REFRESH_TOKEN_REVOKED);
        }

        Person person = token.getPerson();
        String newAccessToken = jwtGenerator.generateAccessToken(person);
        String newRefreshToken = jwtGenerator.generateRefreshToken(person);

        token.setRevoked(true);
        refreshTokenRepository.save(token);

        saveUserRefreshToken(person, newRefreshToken);
        createRefreshTokenCookie(response, newRefreshToken);

        return AuthenticationResponse.builder().accessToken(newAccessToken).accessTokenExpiry(5 * 60)
                                     .tokenType(TokenType.Bearer).username(person.getEmail())
                                     .role(person.getRoles().getName()).build();
    }

    private static String getRefreshToken(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String refreshToken = null;
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if (cookie.getName().equals("refresh_token")) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }
        if (refreshToken == null) {
            throw new AppException(ErrorCode.REFRESH_TOKEN_INVALID);
        }
        refreshToken = refreshToken.replace("Bearer ", "");
        return refreshToken;
    }
}