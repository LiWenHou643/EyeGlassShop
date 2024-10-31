package com.example.eyeglass.controller;

import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.OrderResponse;
import com.example.eyeglass.service.OrderService;
import com.example.eyeglass.service.product.ProductService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/admin")
public class AdminController {
    ProductService productService;
    private final OrderService orderService;

    @GetMapping("/dashboard")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public String dashboard() {
        return "admin/dashboard";
    }

    @GetMapping("/orders")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public String orders() {
        return "admin/orders";
    }

    @PutMapping("/confirm")
    @PreAuthorize("hasAuthority('SCOPE_ADMIN')")
    public ApiResponse<OrderResponse> confirmOrder(@RequestParam(name = "orderId") Long id) {
        return ApiResponse.<OrderResponse>builder().data(orderService.confirm(id)).build();
    }
}