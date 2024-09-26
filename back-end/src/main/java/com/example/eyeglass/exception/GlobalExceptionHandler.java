package com.example.eyeglass.exception;

import com.example.eyeglass.dto.response.ApiResponse;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.server.resource.InvalidBearerTokenException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.nio.file.AccessDeniedException;
import java.text.ParseException;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    ApiResponse<Void> handleException(Exception e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        response.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        return response;
    }

    @ExceptionHandler(RuntimeException.class)
    ApiResponse<Void> handleRuntimeException(RuntimeException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        response.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        return response;
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    ApiResponse<Void> handleNoHandlerFoundException(NoHandlerFoundException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.PATH_NOT_FOUND.getCode());
        response.setMessage(ErrorCode.PATH_NOT_FOUND.getMessage());
        return response;
    }

    @ExceptionHandler(AccessDeniedException.class)
    ApiResponse<Void> handleAccessDeniedException(AccessDeniedException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.ACCESS_DENIED.getCode());
        response.setMessage(ErrorCode.ACCESS_DENIED.getMessage());
        return response;
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    ApiResponse<Void> handleAuthorizationDeniedException(AuthorizationDeniedException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.ACCESS_DENIED.getCode());
        response.setMessage(ErrorCode.ACCESS_DENIED.getMessage());
        return response;
    }

    @ExceptionHandler(AppException.class)
    ApiResponse<Void> handleAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(errorCode.getCode());
        response.setMessage(errorCode.getMessage());
        return response;
    }

    @ExceptionHandler({InvalidBearerTokenException.class, BadJwtException.class, ParseException.class})
    ApiResponse<Void> handleInvalidBearerTokenException(InvalidBearerTokenException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.REFRESH_TOKEN_INVALID.getCode());
        response.setMessage(ErrorCode.REFRESH_TOKEN_INVALID.getMessage());
        return response;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    ApiResponse<Map<String, String>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ApiResponse<Map<String, String>> response = new ApiResponse<>();
        response.setCode(ErrorCode.REGISTER_FAILED.getCode());
        response.setData(errors);

        return response;
    }

}