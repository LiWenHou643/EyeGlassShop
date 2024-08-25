package com.example.eyeglass.dto.response;

import com.example.eyeglass.constants.EyeGlassConstants;

public record AuthenticationResponse(String accessToken, String tokenType) {

    public AuthenticationResponse(String accessToken) {
        this(accessToken, EyeGlassConstants.JWT_PREFIX);
    }
}