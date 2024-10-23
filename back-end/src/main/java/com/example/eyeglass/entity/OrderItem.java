package com.example.eyeglass.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Entity
@Table(name = "order_item")
public class OrderItem extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id; // Primary Key

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    Order order;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    Product product; // Foreign key to products table

    @Column(nullable = false)
    Integer quantity; // Number of items ordered

    @Column(nullable = false, precision = 5, scale = 2)
    BigDecimal discountPercentage = BigDecimal.ZERO; // Discount for this specific item

    @Column(nullable = false, precision = 10, scale = 2)
    BigDecimal price; // Price per item

    @Transient
    BigDecimal discountedPrice; // Discount for this specific item

    @Transient
    BigDecimal totalPrice; // Total price for this item after discount
}
