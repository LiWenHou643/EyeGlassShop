package com.example.eyeglass.controller;

import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.service.product.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
@RequestMapping("/public/products")
public class ProductController {
    ProductService productService;

    @GetMapping
    public ApiResponse<Page<ProductResponse>> getProducts(
            @RequestParam(name = "category", required = false) String category,
            @RequestParam(name = "sort", defaultValue = "title-asc") String sort,
            @RequestParam(name = "page", defaultValue = "0") int page,
            @RequestParam(name = "size", defaultValue = "10") int size) {

        ApiResponse<Page<ProductResponse>> response = new ApiResponse<>();
        response.setData(productService.getProducts(category, page, size, sort));
        return response;
    }

    @GetMapping("/best-seller")
    public ApiResponse<List<ProductResponse>> getBestSellerProducts(@RequestParam(name = "limit", defaultValue = "20") int limit) {
        List<ProductResponse> products = productService.getBestSellerProducts(limit);
        ApiResponse<List<ProductResponse>> response = new ApiResponse<>();
        response.setData(products);
        return response;
    }

    @GetMapping("/search")
    public ApiResponse<List<ProductResponse>> searchProducts(@RequestParam String search) {
        List<ProductResponse> products = productService.searchProducts(search);
        ApiResponse<List<ProductResponse>> response = new ApiResponse<>();
        response.setData(products);
        return response;
    }

    @GetMapping("/{productId}")
    public ResponseEntity<ProductResponse> getProductById(@PathVariable Long productId) {
        return ResponseEntity.status(HttpStatus.OK).body(
                productService.getProductById(productId)
        );
    }
}