package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.user.RegisterDTO;
import com.example.eyeglass.dto.user.PersonDTO;
import com.example.eyeglass.entity.Person;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

    PersonDTO toDTO(Person personEntity);

    Person toEntityFromRegister(RegisterDTO registerDTO);

}