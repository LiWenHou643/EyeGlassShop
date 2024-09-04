package com.example.eyeglass.dto.request;

import lombok.Builder;

@Builder
public record IntrospectRequest(String accessToken) {
}