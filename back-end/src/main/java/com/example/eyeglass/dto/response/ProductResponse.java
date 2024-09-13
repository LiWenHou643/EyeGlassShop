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

    public ProductResponse(Long id, String productCode, String title, int price, int discount, String image, String description, String category, int stockQuantity, int soldQuantity, boolean deleted) {
        this.id = id;
        this.productCode = productCode;
        this.title = title;
        this.price = price;
        this.discount = discount;
        this.image = image;
        this.description = description;
        this.category = category;
        this.stockQuantity = stockQuantity;
        this.soldQuantity = soldQuantity;
        this.deleted = deleted;
    }
}