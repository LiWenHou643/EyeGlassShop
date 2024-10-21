package com.example.eyeglass.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Builder
public class OrderResponse {
    Long id;
    Long personId;
    String status;
    BigDecimal subTotal;
    BigDecimal total;
    BigDecimal discountPercentage;
    String promoCode;
    String shippingAddress;
    String paymentMethod;
    List<OrderItemResponse> orderItems;
}
