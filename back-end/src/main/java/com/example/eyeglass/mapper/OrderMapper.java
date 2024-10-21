package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.request.OrderRequest;
import com.example.eyeglass.dto.response.OrderItemResponse;
import com.example.eyeglass.dto.response.OrderResponse;
import com.example.eyeglass.entity.Order;
import com.example.eyeglass.entity.OrderItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderMapper ORDER_MAPPER = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "personId", target = "person.id")
    Order toOrder(OrderRequest req);

    @Mapping(source = "person.id", target = "personId")
    OrderResponse toOrderResponse(Order order);

    @Mapping(source = "product.id", target = "productId")
    @Mapping(source = "product.title", target = "productName")
    @Mapping(source = "product.image", target = "productImage")
    OrderItemResponse toOrderItemResponse(OrderItem orderItem);
}
