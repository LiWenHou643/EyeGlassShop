package com.example.eyeglass.dto.user;

public record LoginResponseDTO(String jwtToken, PersonDTO user) {

}