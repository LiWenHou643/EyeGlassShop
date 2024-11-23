package com.example.eyeglass.dto.response;

import com.example.eyeglass.entity.OrderStatus;
import com.example.eyeglass.entity.PaymentStatus;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class OrderAdminDTO {
    Long id;
    Long personId;
    LocalDateTime createdAt;
    BigDecimal total;
    String notes;
    OrderStatus orderStatus;
    PaymentStatus paymentStatus;
}
