package com.example.eyeglass.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CartItemResponse {
    Long id;
    String title;
    String description;
    String image;
    int productId;
    int discount;
    int quantity;
    int priceAtTime;
    int totalPrice;
}
