package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.request.OrderRequest;
import com.example.eyeglass.entity.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface OrderMapper {
    OrderMapper ORDER_MAPPER = Mappers.getMapper(OrderMapper.class);

    @Mapping(source = "personId", target = "person.id")
    Order toOrder(OrderRequest req);

    @Mapping(source = "person.id", target = "personId")
    OrderRequest toOrderRequest(Order order);

}
