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
        var cart = cartService.getCartItems(userName);
        var message = cart == null ? "Cart is empty" : "Cart items retrieved successfully";
        return ApiResponse.<CartResponse>builder().message(message).data(cart).build();
    }

    @PostMapping(value = "/add")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<Object> addItemToCart(@RequestParam(required = false, name = "cartId") Long cartId, @RequestParam(name = "productId") Long productId, @RequestParam(name = "quantity") int quantity) {
        if (cartId == null) {
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            cartId = cartService.getCartId(userName);
        }
        String message = cartService.addItemToCart(cartId, productId, quantity);
        return ApiResponse.builder().message(message).build();
    }

    @PostMapping(value = "/update")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<Object> updateItemInCart(@RequestParam(required = false, name = "cartId") Long cartId, @RequestParam(name = "quantity") int quantity) {
        if (cartId == null) {
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            cartId = cartService.getCartId(userName);
        }
        cartService.updateItemInCart(cartId, quantity);
        return ApiResponse.builder().message("Item updated in cart").build();
    }

    @PostMapping(value = "/remove")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<Object> removeItemFromCart(@RequestParam Long cartId, @RequestParam Long productId) {
//        cartService.removeItemFromCart(cartId, productId);
        return ApiResponse.builder().message("Item removed from cart").build();
    }

}
