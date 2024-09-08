package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.ProductRequest;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.service.product.ProductService;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin")
public class AdminController {
    ProductService productService;

    @PostMapping("/product/add")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<ProductResponse> addProduct(@Valid @RequestBody ProductRequest productRequest) {
        ApiResponse<ProductResponse> response = new ApiResponse<>();
        response.setData(productService.addProduct(productRequest));
        return response;
    }

    @PostMapping("/product/update")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<ProductResponse> updateProduct(@Valid @RequestBody ProductRequest productRequest) {
        ApiResponse<ProductResponse> response = new ApiResponse<>();
        response.setData(productService.updateProduct(productRequest));
        return response;
    }

    @PostMapping("/product/delete")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<ProductResponse> deleteProduct(@Valid @RequestBody ProductRequest productRequest) {
        ApiResponse<ProductResponse> response = new ApiResponse<>();
        productService.deleteProduct(productRequest);
        return response;
    }
}