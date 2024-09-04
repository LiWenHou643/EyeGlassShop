package com.example.eyeglass.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    PATH_NOT_FOUND(8888, "Path not found", HttpStatus.NOT_FOUND),
    USER_EXISTED(1001, "User existed", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1002, "User not existed", HttpStatus.NOT_FOUND),
    JWT_INVALID(1003, "JWT invalid", HttpStatus.UNAUTHORIZED),
    JWT_EXPIRED(1004, "JWT expired", HttpStatus.UNAUTHORIZED),
    REFRESH_TOKEN_INVALID(1005, "Refresh token invalid", HttpStatus.UNAUTHORIZED),
    REFRESH_TOKEN_REVOKED(1006, "Refresh token revoked", HttpStatus.UNAUTHORIZED),
    UNAUTHENTICATED(2000, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(2001, "You do not have permission", HttpStatus.FORBIDDEN),
    ;

    ErrorCode(int code, String message, HttpStatusCode statusCode) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private final int code;
    private final String message;
    private final HttpStatusCode statusCode;

}