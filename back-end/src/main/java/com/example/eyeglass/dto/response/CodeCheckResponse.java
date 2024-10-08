package com.example.eyeglass.dto.response;

import lombok.Builder;

@Builder
public record CodeCheckResponse(String promoCode, int value) {
}
