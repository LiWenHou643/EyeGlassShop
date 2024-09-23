package com.example.eyeglass.dto.request;

public record ProductRequest(
        Long id,
        Long categoryId,
        String productCode,
        String title,
        String image,
        String description,
        int discount,
        int price,
        int stockQuantity,
        int soldQuantity
) {
}