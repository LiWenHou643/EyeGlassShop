package com.example.eyeglass.dto.request;

public record OrderItemRequest(
        Long productId,
        Integer quantity
    
) {
}
