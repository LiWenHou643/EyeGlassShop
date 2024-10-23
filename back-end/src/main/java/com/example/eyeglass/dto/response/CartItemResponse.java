package com.example.eyeglass.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Builder
public class CartItemResponse {
    Long id;
    String title;
    String description;
    String image;
    Long productId;
    int quantity;
    BigDecimal price;
    BigDecimal discountPercent;
    BigDecimal discountedPrice;
    BigDecimal totalPrice;
}
