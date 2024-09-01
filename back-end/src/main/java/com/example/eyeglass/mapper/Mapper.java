package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.entity.Person;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface UserMapper {
    PersonResponse toDTO(Person personEntity);

    Person toEntityFromRegister(RegisterRequest registerRequest);

}