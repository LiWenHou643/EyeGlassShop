package com.example.eyeglass.controller;

import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.CartResponse;
import com.example.eyeglass.service.product.CartService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RestController
@RequestMapping("/user/cart")
public class CartController {
    CartService cartService;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<CartResponse> getCartItems() {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        CartResponse cart = cartService.getCartItems(userName);
        ApiResponse<CartResponse> response = new ApiResponse<>();
        if (cart == null) {
            response.setMessage("Cart is empty");
        } else {
            response.setMessage("Cart items retrieved successfully");
        }
        response.setData(cart);
        return response;
    }

    @PostMapping(value = "/add")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<Object> addItemToCart(@RequestParam(required = false, name = "cartId") Long cartId, @RequestParam(name = "productId") Long productId, @RequestParam(name = "quantity") int quantity) {
        if (cartId == null) {
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            cartId = cartService.getCartId(userName);
        }
        cartService.addItemToCart(cartId, productId, quantity);
        return ApiResponse.builder().message("Item added to cart").build();
    }

    @PostMapping(value = "/remove")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<Object> removeItemFromCart(@RequestParam Long cartId, @RequestParam Long productId) {
//        cartService.removeItemFromCart(cartId, productId);
        return ApiResponse.builder().message("Item removed from cart").build();
    }

}
