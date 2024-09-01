package com.example.eyeglass.service.product;

import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.entity.Product;
import com.example.eyeglass.mapper.Mapper;
import com.example.eyeglass.repository.product.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class ProductService {
    ProductRepository productRepository;
    Mapper mapper;

    public ProductResponse getProductById(Long productId) {
        log.error("Get product by id: {}", productId);
        return productRepository.findProductById(productId)
                                .orElseThrow(() -> new RuntimeException("Product not found"));
    }
}