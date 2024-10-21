package com.example.eyeglass.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

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
    BigDecimal price;
    int discount;
    int stockQuantity;
    int soldQuantity;
    boolean deleted;
}