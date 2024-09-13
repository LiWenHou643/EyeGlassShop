package com.example.eyeglass.dto.request;

public record ProductRequest(
        Long id,
        String productCode,
        String title,
        String image,
        String description,
        Long categoryId,
        int discount,
        int price,
        int stockQuantity,
        int soldQuantity
) {
}