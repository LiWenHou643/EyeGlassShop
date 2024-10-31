package com.example.eyeglass.dto.request;

import com.example.eyeglass.entity.PaymentMethod;

import java.math.BigDecimal;
import java.util.List;

public record OrderRequest(Long personId,
                           String promoCode, String shippingAddress, String notes,
                           BigDecimal shipCost,
                           PaymentMethod paymentMethod, List<Long> selectedCartItems) {
}
