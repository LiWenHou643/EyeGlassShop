package com.example.eyeglass.dto.response;

import lombok.*;

@Builder
public record AuthenticationResponse(String accessToken, int accessTokenExpiry, TokenType tokenType, String userName) {
}