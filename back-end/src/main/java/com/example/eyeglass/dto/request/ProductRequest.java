package com.example.eyeglass.dto.request;

public record ProductRequest(
        Long id,
        String productCode,
        String title,
        int price,
        int discount,
        String thumbnail,
        String description,
        Long categoryId,
        int stockQuantity,
        int soldQuantity
) {
}