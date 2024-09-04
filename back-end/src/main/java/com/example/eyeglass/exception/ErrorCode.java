package com.example.eyeglass.exception;

import lombok.Getter;

@Getter
public enum ErrorCode {
    UNCATEGORIZED(9999, "Uncategorized error"),
    USER_NOT_EXISTED(1001, "User not found"),
    USER_ALREADY_EXISTS(1002, "User already exists"),
    INVALID_CREDENTIALS(1003, "Invalid credentials"),
    INVALID_REFRESH_TOKEN(1004, "Invalid refresh token"),
    INVALID_ACCESS_TOKEN(1005, "Invalid access token"),
    UNAUTHENTICATED(1006, "Unauthenticated"),
    ;

    ErrorCode(int code, String message) {
        this.code = code;
        this.message = message;
    }

    private final int code;
    private final String message;

}