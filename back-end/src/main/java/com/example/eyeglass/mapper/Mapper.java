package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.request.RegisterRequest;
import com.example.eyeglass.dto.response.PersonResponse;
import com.example.eyeglass.entity.Category;
import com.example.eyeglass.entity.Person;

@org.mapstruct.Mapper(componentModel = "spring")
public interface Mapper {
    PersonResponse toDTO(Person personEntity);

    Person toEntityFromDto(RegisterRequest registerRequest);

}