package com.example.eyeglass.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder(toBuilder = true)
public class OrderResponse {
    Long id;
    Long personId;
    String status;
    BigDecimal subTotal;
    BigDecimal discountPercentage;
    BigDecimal total;
    String promoCode;
    String shippingAddress;
    String paymentMethod;
    List<OrderItemResponse> orderItems;
}
