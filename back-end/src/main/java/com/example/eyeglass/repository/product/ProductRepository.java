package com.example.eyeglass.repository.product;

import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.entity.Product;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@NonNullApi
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT new com.example.eyeglass.dto.response.ProductResponse(" +
            "p.id, p.productCode, p.title, p.price, p.discount, p.thumbnail, p.description, c.name, pi.stockQuantity, pi.soldQuantity) " +
            "FROM Product p " +
            "JOIN p.category c " +
            "JOIN ProductInventory pi ON p.id = pi.product.id " +
            "WHERE p.id = :productId")
    Optional<ProductResponse> findProductById(Long productId);

    @Query("SELECT new com.example.eyeglass.dto.response.ProductResponse(" +
            "p.id, p.productCode, p.title, p.price, p.discount, p.thumbnail, p.description, c.name, pi.stockQuantity, pi.soldQuantity) " +
            "FROM Product p " +
            "JOIN p.category c " +
            "JOIN ProductInventory pi ON p.id = pi.product.id " +
            "WHERE p.isDeleted = false " +
            "AND (:category IS NULL OR c.name = :category)")
    Page<ProductResponse> findAllByIsDeletedIsFalse(@Param("category") String category, Pageable pageable);

    @Query("SELECT new com.example.eyeglass.dto.response.ProductResponse(" +
            "p.id, p.productCode, p.title, p.price, p.discount, p.thumbnail, p.description, c.name, pi.stockQuantity, pi.soldQuantity) " +
            "FROM Product p " +
            "JOIN p.category c " +
            "JOIN ProductInventory pi ON p.id = pi.product.id " +
            "WHERE p.isDeleted = false " +
            "AND LOWER(REPLACE(p.title, ' ', '')) LIKE LOWER(CONCAT('%', REPLACE(:search, ' ', ''), '%'))")
    List<ProductResponse> findByTitleContainingIgnoreCase(@Param("search") String search);

    boolean existsByProductCode(String title);
}