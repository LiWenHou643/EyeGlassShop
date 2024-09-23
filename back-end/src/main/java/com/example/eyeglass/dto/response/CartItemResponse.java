package com.example.eyeglass.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class CartItemResponse {
    Long id;
    String title;
    String description;
    String image;
    int discount;
    int quantity;
    int priceAtTime;
    int totalPrice;
}
