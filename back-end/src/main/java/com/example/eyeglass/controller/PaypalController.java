package com.example.eyeglass.controller;

import com.example.eyeglass.config.Authentication.JwtUtils;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.service.PaymentService;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import static lombok.AccessLevel.PRIVATE;

@RestController
@FieldDefaults(level = PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PaypalController {
    PaymentService paymentService;
    JwtUtils jwtUtils;

    @GetMapping("/payment/success")
    public ApiResponse<String> successPayment(@RequestParam(name = "accessToken") String accessToken,
            @RequestParam(name = "orderId") String orderId,
            @RequestParam(name = "paymentId") String paymentId,
            @RequestParam(name = "PayerID") String payerId) {
        try {
            Jwt jwt = jwtUtils.getToken(accessToken);
            boolean isExpired = jwtUtils.isExpired(jwt);
            boolean isInvalidated = jwtUtils.isInvalidated(jwt);
            if (isExpired) {
                throw new AppException(ErrorCode.JWT_EXPIRED);
            } else if (isInvalidated) {
                throw new AppException(ErrorCode.JWT_INVALID);
            }

            // Execute payment
            String payment = paymentService.executePaypalPayment(paymentId, payerId, orderId);
            return ApiResponse.<String>builder()
                              .data(payment)
                              .message("Payment executed successfully.")
                              .build();
        } catch (PayPalRESTException e) {
            throw new AppException(ErrorCode.PAYPAL_FAILED);
        }
    }
}