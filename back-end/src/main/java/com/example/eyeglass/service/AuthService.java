package com.example.eyeglass.service;

import com.example.eyeglass.config.jwtAuth.JwtGenerator;
import com.example.eyeglass.config.user.UserInfoConfig;
import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.AuthenticationResponse;
import com.example.eyeglass.dto.response.TokenType;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.entity.RefreshToken;
import com.example.eyeglass.exception.UserAlreadyExistsException;
import com.example.eyeglass.mapper.UserMapper;
import com.example.eyeglass.repository.PersonRepository;
import com.example.eyeglass.repository.RefreshTokenRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
    PersonRepository personRepository;
    RefreshTokenRepository refreshTokenRepository;

    public AuthenticationResponse getJwtTokensAfterAuthentication(Authentication authentication, HttpServletResponse response) {
        try {
            var userInfoEntity = personRepository.findByEmail(authentication.getName())
                                                 .orElseThrow(() -> {
                                                     log.error("[AuthService:userSignInAuth] User :{} not found",
                                                             authentication.getName());
                                                     return new ResponseStatusException(HttpStatus.NOT_FOUND,
                                                             "USER NOT FOUND ");
                                                 });

            String accessToken = jwtGenerator.generateAccessToken(authentication);
            String refreshToken = jwtGenerator.generateRefreshToken(authentication);

            saveUserRefreshToken(userInfoEntity, refreshToken);

            createTokenCookie(response, accessToken, refreshToken);
            log.info("[AuthService:userSignInAuth] Access token for user:{}, has been generated",
                    userInfoEntity.getEmail());
            return AuthenticationResponse.builder()
                                         .userName(userInfoEntity.getEmail())
                                         .status("ok")
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

    private void createTokenCookie(HttpServletResponse response, String accesstoken, String refreshToken) {
        Cookie accessTokenCookie = new Cookie("access_token", accesstoken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setMaxAge(15 * 60); // in seconds : 15 minutes
        response.addCookie(accessTokenCookie);

        Cookie refreshTokenCookie = new Cookie("refresh_token", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(true);
        refreshTokenCookie.setMaxAge(15 * 24 * 60 * 60); // in seconds : 15 days
        response.addCookie(refreshTokenCookie);
    }

    public Object getAccessTokenUsingRefreshToken(UserInfoConfig userInfo) {

        Authentication authentication = new UsernamePasswordAuthenticationToken(
                userInfo.getUsername(),
                null,
                userInfo.getAuthorities()
        );

        String accessToken = jwtGenerator.generateAccessToken(authentication);

        return AuthenticationResponse.builder()
                                     .userName(userInfo.getUsername())
                                     .status("ok")
                                     .build();
    }


    public AuthenticationResponse registerUser(RegisterRequest request,
            HttpServletResponse httpServletResponse) {
        try {
            log.info("[AuthService:registerUser]User Registration Started with :::{}", request);

            Optional<Person> user = personRepository.findByEmail(request.getEmail());
            if (user.isPresent()) {
                throw new UserAlreadyExistsException("User Already Exist");
            }

            Person person = UserMapper.toEntityFromRegister(request);
            List<GrantedAuthority> authorities = Arrays.stream(person.getRoles().getName().split(","))
                                                       .map(SimpleGrantedAuthority::new)
                                                       .collect(Collectors.toList());

            Authentication authentication = new UsernamePasswordAuthenticationToken(person.getEmail(), null,
                    authorities);

            // Generate a JWT token
            String accessToken = jwtGenerator.generateAccessToken(authentication);
            String refreshToken = jwtGenerator.generateRefreshToken(authentication);

            Person savedUserDetails = personRepository.save(person);
            saveUserRefreshToken(person, refreshToken);

            createTokenCookie(httpServletResponse, accessToken, refreshToken);

            log.info("[AuthService:registerUser] User:{} Successfully registered", savedUserDetails.getEmail());
            return AuthenticationResponse.builder()
                                         .userName(savedUserDetails.getEmail())
                                         .status("ok").build();


        } catch (Exception e) {
            log.error("[AuthService:registerUser]Exception while registering the user due to :" + e.getMessage());
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, e.getMessage());
        }
    }
}