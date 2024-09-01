package com.example.eyeglass.service.product;

import com.example.eyeglass.entity.ProductInventory;
import com.example.eyeglass.repository.product.ProductInventoryRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.Optional;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class ProductInventoryService {

    ProductInventoryRepository productInventoryRepository;

    public Optional<ProductInventory> getInventoryByProductId(Long productId) {
        return productInventoryRepository.findByProductId(productId);
    }

    public ProductInventory updateInventory(ProductInventory productInventory) {
        return productInventoryRepository.save(productInventory);
    }


}