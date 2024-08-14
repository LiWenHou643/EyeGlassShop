package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.user.CreateUserDTO;
import com.example.eyeglass.dto.user.CustomerDTO;
import com.example.eyeglass.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    Customer toEntity(CustomerDTO customerDTO);

    CustomerDTO toDTO(Customer customer);

    Customer toEntityFromCreate(CreateUserDTO createUserDTO);

}
