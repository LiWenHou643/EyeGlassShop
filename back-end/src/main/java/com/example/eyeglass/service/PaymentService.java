package com.example.eyeglass.service;

import com.example.eyeglass.dto.response.PaymentResponse;
import com.example.eyeglass.entity.Order;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class PaymentService {

    @Value("${stripe.api.secret-key}")
    String stripeSecretKey;

    public PaymentResponse createPaymentLink(Order order) throws StripeException {

        Stripe.apiKey = stripeSecretKey;

        BigDecimal totalAmount = order.getTotal(); // Assuming this returns BigDecimal
        Long unitAmount = totalAmount.multiply(BigDecimal.valueOf(100)).longValue(); // Convert to Long

        SessionCreateParams params =
                SessionCreateParams.builder()
                                   .addPaymentMethodType(
                                           SessionCreateParams.PaymentMethodType.CARD)
                                   .setMode(SessionCreateParams.Mode.PAYMENT)
                                   .setSuccessUrl("http://localhost:3000/payment/success%d".formatted(order.getId()))
                                   .setCancelUrl("http://localhost:3000/payment/fail")
                                   .addLineItem(SessionCreateParams.LineItem.builder()
                                                                            .setQuantity(1L)
                                                                            .setPriceData(
                                                                                    SessionCreateParams.LineItem.PriceData.builder()
                                                                                                                          .setCurrency(
                                                                                                                                  "vnd")
                                                                                                                          .setUnitAmount(
                                                                                                                                  unitAmount)
                                                                                                                          .setProductData(
                                                                                                                                  SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                                                                                                                                    .setName(
                                                                                                                                                                                            "Eye Hero")
                                                                                                                                                                                    .build())
                                                                                                                          .build())
                                                                            .build())
                                   .build();

        Session session = Session.create(params);

        PaymentResponse res = new PaymentResponse();
        res.setPaymentUrl(session.getUrl());
        return res;
    }
}
