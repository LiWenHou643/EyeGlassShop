package com.example.eyeglass.dto.response;

import lombok.Builder;

@Builder
public record IntrospectResponse(boolean valid) {
}