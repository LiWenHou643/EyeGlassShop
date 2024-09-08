package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.request.ProductRequest;
import com.example.eyeglass.dto.response.ProductResponse;
import com.example.eyeglass.entity.Product;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductMapper PRODUCT_MAPPER = Mappers.getMapper(ProductMapper.class);

    @Mapping(source = "category.name", target = "category")
    @Mapping(target = "stockQuantity", ignore = true)
    @Mapping(target = "soldQuantity", ignore = true)
    ProductResponse toProductResponse(Product product);

    Product toProductEntity(ProductRequest productRequest);
}
