package com.example.eyeglass.service.product;

import com.example.eyeglass.dto.request.ProductRequest;
import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.entity.Category;
import com.example.eyeglass.entity.Product;
import com.example.eyeglass.entity.ProductInventory;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.repository.product.ProductInventoryRepository;
import com.example.eyeglass.repository.product.ProductRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import static com.example.eyeglass.mapper.ProductMapper.PRODUCT_MAPPER;

@Slf4j
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
public class ProductService {
    CategoryService categoryService;
    ProductRepository productRepository;
    ProductInventoryRepository productInventoryRepository;

    public Page<ProductResponse> getProducts(String category, int page, int size, String sort) {
        String[] sortParams = sort.split("-");
        String sortField = sortParams[0];
        Sort.Direction sortDirection = sortParams[1].equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC;
        if (page < 1) page = 1;
        if (sortField.equals("soldQuantity")) sortField = "pi.soldQuantity";
        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(sortDirection, sortField));
        return productRepository.findAllByIsDeletedIsFalse(category, pageable);
    }

    public List<ProductResponse> getBestSellerProducts(int limit) {
        Pageable pageable = PageRequest.of(0, limit, Sort.by(Sort.Direction.DESC, "pi.soldQuantity"));
        return productRepository.findBestSellerProducts(pageable);
    }

    public List<ProductResponse> searchProducts(String search) {
        return productRepository.findByTitleContainingIgnoreCase(search);
    }

    public ProductResponse getProductById(Long productId) {
        return productRepository.findProductById(productId)
                                .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
    }

    public ProductResponse addProduct(ProductRequest productRequest) {
        boolean isProductExist = productRepository.existsByProductCode(productRequest.productCode());
        if (isProductExist) {
            throw new AppException(ErrorCode.PRODUCT_EXISTED);
        }

        // Save product to database
        Product product = PRODUCT_MAPPER.toProductEntity(productRequest);
        Category category = categoryService.getCategoryById(productRequest.categoryId());
        product.setCategory(category);
        productRepository.save(product);

        //Save product inventory to database
        ProductInventory productInventory = new ProductInventory();
        productInventory.setStockQuantity(productRequest.stockQuantity());
        productInventory.setSoldQuantity(0);
        productInventory.setProduct(product);
        productInventoryRepository.save(productInventory);

        ProductResponse productResponse = PRODUCT_MAPPER.toProductResponse(product);
        productResponse.setSoldQuantity(0);
        productResponse.setStockQuantity(productRequest.stockQuantity());
        return productResponse;
    }

    public ProductResponse updateProduct(ProductRequest productRequest) {
        Product product = productRepository.findById(productRequest.id())
                                           .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setProductCode(productRequest.productCode());
        product.setTitle(productRequest.title());
        product.setPrice(productRequest.price());
        product.setDiscount(productRequest.discount());
        product.setThumbnail(productRequest.thumbnail());
        product.setDescription(productRequest.description());
        Category category = categoryService.getCategoryById(productRequest.categoryId());
        product.setCategory(category);
        productRepository.save(product);

        ProductResponse productResponse = PRODUCT_MAPPER.toProductResponse(product);
        productResponse.setStockQuantity(productRequest.stockQuantity());
        productResponse.setSoldQuantity(productRequest.soldQuantity());
        return productResponse;
    }

    public void deleteProduct(ProductRequest productRequest) {
        Product product = productRepository.findById(productRequest.id())
                                           .orElseThrow(() -> new AppException(ErrorCode.PRODUCT_NOT_FOUND));
        product.setDeleted(true);
        productRepository.save(product);
    }
}