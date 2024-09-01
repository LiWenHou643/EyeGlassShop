package com.example.eyeglass.repository.product;

import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.entity.Product;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@NonNullApi
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT new com.example.eyeglass.dto.response.ProductResponse(" +
            "p.id, p.title, p.price, p.discount, p.thumbnail, p.description, c.name, pi.stockQuantity, pi.soldQuantity) " +
            "FROM Product p " +
            "JOIN p.category c " +
            "JOIN ProductInventory pi ON p.id = pi.product.id " +
            "WHERE p.id = :productId")
    Optional<ProductResponse> findProductById(Long productId);

}