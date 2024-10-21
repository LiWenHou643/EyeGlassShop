package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.OrderRequest;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.PaymentResponse;
import com.example.eyeglass.entity.Order;
import com.example.eyeglass.service.OrderService;
import com.example.eyeglass.service.PaymentService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;
    private PaymentService paymentService;

    @PostMapping("/order")
    public ApiResponse<PaymentResponse> createOrder(@RequestBody OrderRequest req) throws StripeException {
        String userName = SecurityContextHolder.getContext().getAuthentication().getName();

        Order order = orderService.createOrder(req, userName);
//        PaymentResponse res = paymentService.createPaymentLink(order);

        ApiResponse<PaymentResponse> response = new ApiResponse<>();
//        response.setData(res);
//        response.setMessage("Order created successfully");
        return response;
    }
}
