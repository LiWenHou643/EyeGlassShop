package com.example.eyeglass.service;

import com.example.eyeglass.entity.ProductInventory;
import com.example.eyeglass.repository.ProductInventoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProductInventoryService {

    private final ProductInventoryRepository productInventoryRepository;

    @Autowired
    public ProductInventoryService(ProductInventoryRepository productInventoryRepository) {
        this.productInventoryRepository = productInventoryRepository;
    }

    public Optional<ProductInventory> getInventoryByProductId(Long productId) {
        return productInventoryRepository.findByProductId(productId);
    }

    public ProductInventory updateInventory(ProductInventory productInventory) {
        return productInventoryRepository.save(productInventory);
    }

    public void adjustInventoryAfterSale(Long productId, int quantitySold) {
        Optional<ProductInventory> inventoryOpt = productInventoryRepository.findByProductId(productId);
        if (inventoryOpt.isPresent()) {
            ProductInventory inventory = inventoryOpt.get();
            inventory.setAvailableQuantity(inventory.getAvailableQuantity() - quantitySold);
            inventory.setSoldQuantity(inventory.getSoldQuantity() + quantitySold);
            productInventoryRepository.save(inventory);
        } else {
            // Handle case where inventory is not found
        }
    }

    // Additional methods as needed

}