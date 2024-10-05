package com.example.eyeglass.dto.request;

import com.example.eyeglass.entity.Address;
import lombok.Builder;

@Builder
public record UpdateProfileRequest(
        String fullName,
        String phoneNumber,
        Address address,
        String image
) {
}
