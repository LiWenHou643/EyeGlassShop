package com.example.eyeglass.controller;

import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.service.product.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/public/products")
public class ProductController {

    ProductService productService;

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long productId) {
        log.error("Get product by id: {}", productId);
        return ResponseEntity.status(HttpStatus.OK).body(
                productService.getProductById(productId)
        );
    }
}