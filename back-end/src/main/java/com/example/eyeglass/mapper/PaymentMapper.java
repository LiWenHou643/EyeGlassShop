package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.response.PaymentResponse;
import com.example.eyeglass.entity.Payments;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PaymentMapper {
    PaymentMapper INSTANCE = Mappers.getMapper(PaymentMapper.class);

    PaymentResponse toPaymentResponse(Payments payment);
}
