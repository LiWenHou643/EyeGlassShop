package com.example.eyeglass.dto.request;

public record AuthenticationRequest(String username, String password, boolean persistent) {
}