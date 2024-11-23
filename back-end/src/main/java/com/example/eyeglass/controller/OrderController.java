package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.OrderRequest;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.OrderResponse;
import com.example.eyeglass.dto.response.PaymentLink;
import com.example.eyeglass.entity.PaymentMethod;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.service.OrderService;
import com.example.eyeglass.service.PaymentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/orders")
public class OrderController {
    OrderService orderService;
    PaymentService paymentService;

    @PostMapping("/create")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<PaymentLink> createOrder(@RequestBody OrderRequest req) {
        var order = orderService.createOrder(req);
        // Save the payment into database
        paymentService.savePayment(order, null, req.paymentMethod()); // Save the payment
        if (req.paymentMethod().equals(PaymentMethod.PAYPAL)) {
            PaymentLink link = paymentService.createPaypalPayment(order, req.selectedCartItems());
            return ApiResponse.<PaymentLink>builder().data(link).build();
        } else if (req.paymentMethod().equals(PaymentMethod.CASH_ON_DELIVERY)) {
            PaymentLink link = paymentService.createPayment(order, req.selectedCartItems());
            return ApiResponse.<PaymentLink>builder().data(link).build();
        } else {
            throw new AppException(ErrorCode.PAYMENT_METHOD_NOT_SUPPORTED);
        }
    }

    @GetMapping("/list")
    @PreAuthorize("hasAnyAuthority('SCOPE_USER', 'SCOPE_ADMIN')")
    public ApiResponse<?> listOrders() {
        return ApiResponse.builder().data(orderService.listOrder()).build();
    }

    @PutMapping("/cancel/{id}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<OrderResponse> cancelOrder(@PathVariable Long id) {
        var order = orderService.cancelOrder(id);
        return ApiResponse.<OrderResponse>builder().message("Order cancelled successfully").data(order).build();
    }

    @PutMapping("/confirmReceipt/{id}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<OrderResponse> confirmReceipt(@PathVariable Long id) {
        return ApiResponse.<OrderResponse>builder().data(orderService.confirmReceipt(id)).build();
    }

    @GetMapping("/track/{id}")
    public ApiResponse<List<Object[]>> getStatusHistory(@PathVariable Long id) {
        List<Object[]> statusHistory = orderService.getStatusHistory(id);
        return ApiResponse.<List<Object[]>>builder().data(statusHistory).build();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<OrderResponse> getOrder(@PathVariable Long id) {
        OrderResponse order = orderService.getOrderById(id);
        return ApiResponse.<OrderResponse>builder().data(order).build();
    }


}
