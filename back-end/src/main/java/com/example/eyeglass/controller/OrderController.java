package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.OrderRequest;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.PaymentResponse;
import com.example.eyeglass.entity.PaymentMethod;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.service.OrderService;
import com.example.eyeglass.service.PaypalService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class OrderController {
    OrderService orderService;
    PaypalService paypalService;

    @PostMapping("/order/create")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<PaymentResponse> createOrder(@RequestBody OrderRequest req) {
        var order = orderService.createOrder(req);

        // Save the payment into database
        paypalService.savePayment(order, null, req.paymentMethod()); // Save the payment
        if (req.paymentMethod().equals(PaymentMethod.PAYPAL)) {
            // Create PayPal link for online payment
            PaymentResponse link = paypalService.createPayment(order);
            return ApiResponse.<PaymentResponse>builder().data(link).build();
        } else if (req.paymentMethod().equals(PaymentMethod.CASH_ON_DELIVERY)) {
            // Do nothing
        } else {
            throw new AppException(ErrorCode.PAYMENT_METHOD_NOT_SUPPORTED);
        }
        return null;
    }
}
