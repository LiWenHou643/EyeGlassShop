package com.example.eyeglass.dto.response;

import com.example.eyeglass.constants.EyeGlassConstants;

public record AuthenticationResponse(String accessToken, boolean isAuthenticated, String message) {

    public static AuthenticationResponse of(String accessToken, boolean isAuthenticated, String message) {
        return new AuthenticationResponse(EyeGlassConstants.JWT_PREFIX + accessToken, isAuthenticated, message);
    }

}