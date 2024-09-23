package com.example.eyeglass.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ProductResponse {
    Long id;
    String productCode;
    String title;
    String image;
    String description;
    String category;
    int discount;
    int price;
    int stockQuantity;
    int soldQuantity;
    boolean deleted;
}