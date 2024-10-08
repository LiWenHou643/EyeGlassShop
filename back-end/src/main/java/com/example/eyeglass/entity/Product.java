package com.example.eyeglass.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "product")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @NotBlank(message = "Product promoCode cannot be blank")
    @Column(name = "product_code")
    String productCode;

    @NotBlank(message = "Title cannot be blank")
    String title;

    @NotBlank(message = "Image cannot be blank")
    String image;

    @NotBlank(message = "Description cannot be blank")
    String description;

    @NotNull(message = "Price cannot be null")
    @Min(value = 0, message = "Price cannot be less than 0")
    int price;

    @NotNull(message = "Discount cannot be null")
    @Min(value = 0, message = "Discount cannot be less than 0")
    @Max(value = 100, message = "Discount cannot be more than 100")
    int discount;

    @Column(name = "stock_quantity")
    int stockQuantity = 0;

    @Column(name = "sold_quantity")
    int soldQuantity = 0;

    @Column(name = "is_deleted")
    boolean deleted = false;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = Category.class)
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    Category category;

    @OneToMany(mappedBy = "product")
    Set<CartItem> cartItems = new HashSet<>();
}
