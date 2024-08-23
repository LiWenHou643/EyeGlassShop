package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.user.RegisterDTO;
import com.example.eyeglass.dto.user.CustomerDTO;
import com.example.eyeglass.entity.Customer;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    CustomerDTO toDTO(Customer customerEntity);

    Customer toEntityFromRegister(RegisterDTO registerDTO);

}