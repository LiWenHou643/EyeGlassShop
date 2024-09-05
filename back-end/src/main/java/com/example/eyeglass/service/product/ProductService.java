package com.example.eyeglass.service.product;

import com.example.eyeglass.dto.request.CreateProductRequest;
import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.entity.Category;
import com.example.eyeglass.entity.Product;
import com.example.eyeglass.entity.ProductInventory;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.mapper.Mapper;
import com.example.eyeglass.repository.product.ProductInventoryRepository;
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
    CategoryService categoryService;
    ProductRepository productRepository;
    ProductInventoryRepository productInventoryRepository;

    public ProductResponse getProductById(Long productId) {
        return productRepository.findProductById(productId)
                                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    public void addProduct(CreateProductRequest createProductRequest) {
        boolean isProductExist = productRepository.existsByProductCode(createProductRequest.productCode());
        if (isProductExist) {
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }

        // Save product to database
        Product product = new Product();
        product.setProductCode(createProductRequest.productCode());
        product.setTitle(createProductRequest.title());
        product.setPrice(createProductRequest.price());
        product.setDiscount(createProductRequest.discount());
        product.setThumbnail(createProductRequest.thumbnail());
        product.setDescription(createProductRequest.description());
        Category category = categoryService.getCategoryById(createProductRequest.categoryId());
        product.setCategory(category);
        productRepository.save(product);

        //Save product inventory to database
        ProductInventory productInventory = new ProductInventory();
        productInventory.setStockQuantity(createProductRequest.stockQuantity());
        productInventory.setSoldQuantity(0);
        productInventory.setProduct(product);
        productInventoryRepository.save(productInventory);

    }
}