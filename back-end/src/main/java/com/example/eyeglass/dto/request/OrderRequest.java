package com.example.eyeglass.dto.request;

import com.example.eyeglass.entity.PaymentMethod;

import java.util.List;

public record OrderRequest(Long personId,
                           String promoCode, String shippingAddress,
                           PaymentMethod paymentMethod, List<Long> selectedCartItems) {
}
