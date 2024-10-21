package com.example.eyeglass.dto.request;

import com.example.eyeglass.entity.Address;

public record UpdateProfileRequest(
        String fullName,
        String phoneNumber,
        Address address,
        String image
) {
}
