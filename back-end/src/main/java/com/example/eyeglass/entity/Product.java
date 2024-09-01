package com.example.eyeglass.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.*;
import lombok.experimental.FieldDefaults;

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

    @NotBlank(message = "Title cannot be blank")
    String title;

    @NotBlank(message = "Price cannot be blank")
    int price;

    @NotBlank(message = "Discount cannot be blank")
    int discount;

    @NotBlank(message = "Thumbnail cannot be blank")
    String thumbnail;

    @NotBlank(message = "Description cannot be blank")
    String description;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST, targetEntity = Category.class)
    @JoinColumn(name = "category_id", referencedColumnName = "id", nullable = false)
    Category category;
}