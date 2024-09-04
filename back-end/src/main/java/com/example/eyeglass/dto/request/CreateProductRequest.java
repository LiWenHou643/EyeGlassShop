package com.example.eyeglass.dto.request;

public record CreateProductRequest(
        String title,
        String productCode,
        int price,
        int discount,
        String thumbnail,
        String description,
        int stockQuantity,
        Long categoryId
) {
}