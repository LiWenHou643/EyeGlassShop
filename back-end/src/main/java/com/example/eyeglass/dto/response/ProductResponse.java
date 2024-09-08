package com.example.eyeglass.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    Long id;
    String productCode;
    String title;
    int price;
    int discount;
    String thumbnail;
    String description;
    String category;
    int stockQuantity;
    int soldQuantity;
}