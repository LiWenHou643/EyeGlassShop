package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.user.CreateUserDTO;
import com.example.eyeglass.dto.user.UserDTO;
import com.example.eyeglass.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    User toEntity(UserDTO userDTO);

    UserDTO toDTO(User user);

    User toEntityFromCreate(CreateUserDTO createUserDTO);

}
