package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.CreateProductRequest;
import com.example.eyeglass.service.product.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/admin")
public class AdminController {
    ProductService productService;

    @PostMapping("/product/add")
    public ResponseEntity<?> addProduct(@Valid @RequestBody CreateProductRequest createProductRequest) {
        productService.addProduct(createProductRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}