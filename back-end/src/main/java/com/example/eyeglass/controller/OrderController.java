package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.OrderRequest;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.PaymentResponse;
import com.example.eyeglass.service.OrderService;
import com.example.eyeglass.service.PaypalService;
import com.example.eyeglass.service.StripeService;
import com.stripe.exception.StripeException;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;
    PaypalService paypalService;
    StripeService stripeService;

    @PostMapping("/order")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<PaymentResponse> createOrder(@RequestBody OrderRequest req) throws StripeException {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();
        var order = orderService.createOrder(req, userName);
        var res = stripeService.createPaymentLink(order);
//        var res = paypalService.createPaymentLink(order);
        return ApiResponse.<PaymentResponse>builder().message("Order created successfully").data(res).build();
    }
}
