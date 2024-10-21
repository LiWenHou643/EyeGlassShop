package com.example.eyeglass.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@ToString
@Entity
@Table(name = "orders")
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id; // Primary Key

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "person_id", nullable = false)
    Person person; // Foreign key to users table

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    OrderStatus status = OrderStatus.PENDING; // ENUM for status

    @Column(nullable = false, precision = 10, scale = 2)
    BigDecimal subTotal; // Total before discounts

    @Column(nullable = false, precision = 10, scale = 2)
    @Transient
    BigDecimal total; // Total after discounts

    @Column(nullable = false, precision = 10, scale = 2)
    BigDecimal discountPercentage; // Total discount

    String promoCode; // Applied promotion code

    @Column(nullable = false)
    String shippingAddress; // Shipping address

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    PaymentMethod paymentMethod; // ENUM for payment method

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, fetch = FetchType.LAZY) // Lazy loading
    Set<OrderItem> orderItems = new HashSet<>();
}
