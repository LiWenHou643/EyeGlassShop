package com.example.eyeglass.mapper;

import com.example.eyeglass.dto.PersonDTO;
import com.example.eyeglass.entity.Person;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface PersonMapperInterface {
    PersonMapperInterface MAPPER = Mappers.getMapper(PersonMapperInterface.class);

    @Mapping(source = "id", target = "id")
    Person toEntity(PersonDTO personDTO);

    @Mapping(source = "id", target = "id")
    PersonDTO toDTO(Person person);
}
