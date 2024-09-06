package com.example.eyeglass.exception;

import com.example.eyeglass.dto.response.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authorization.AuthorizationDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.NoHandlerFoundException;

import java.nio.file.AccessDeniedException;
import java.util.HashMap;
import java.util.Map;


@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    ResponseEntity<ApiResponse<Void>> handleException(Exception e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        response.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        return ResponseEntity.status(ErrorCode.UNCATEGORIZED_EXCEPTION.getStatusCode()).body(response);
    }

    @ExceptionHandler(RuntimeException.class)
    ResponseEntity<ApiResponse<Void>> handleRuntimeException(RuntimeException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.UNCATEGORIZED_EXCEPTION.getCode());
        response.setMessage(ErrorCode.UNCATEGORIZED_EXCEPTION.getMessage());
        return ResponseEntity.status(ErrorCode.UNCATEGORIZED_EXCEPTION.getStatusCode()).body(response);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    ResponseEntity<ApiResponse<Void>> handleNoHandlerFoundException(NoHandlerFoundException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.PATH_NOT_FOUND.getCode());
        response.setMessage(ErrorCode.PATH_NOT_FOUND.getMessage());
        return ResponseEntity.status(ErrorCode.PATH_NOT_FOUND.getStatusCode()).body(response);
    }

    @ExceptionHandler(AccessDeniedException.class)
    ResponseEntity<ApiResponse<Void>> handleAccessDeniedException(AccessDeniedException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.ACCESS_DENIED.getCode());
        response.setMessage(ErrorCode.ACCESS_DENIED.getMessage());
        return ResponseEntity.status(ErrorCode.ACCESS_DENIED.getStatusCode()).body(response);
    }

    @ExceptionHandler(AuthorizationDeniedException.class)
    ResponseEntity<ApiResponse<Void>> handleAuthorizationDeniedException(AuthorizationDeniedException e) {
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(ErrorCode.ACCESS_DENIED.getCode());
        response.setMessage(ErrorCode.ACCESS_DENIED.getMessage());
        return ResponseEntity.status(ErrorCode.ACCESS_DENIED.getStatusCode()).body(response);
    }

    @ExceptionHandler(AppException.class)
    ResponseEntity<ApiResponse<Void>> handleAppException(AppException e) {
        ErrorCode errorCode = e.getErrorCode();
        ApiResponse<Void> response = new ApiResponse<>();
        response.setCode(errorCode.getCode());
        response.setMessage(errorCode.getMessage());
        return ResponseEntity.status(errorCode.getStatusCode()).body(response);
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    ResponseEntity<ApiResponse<Map<String, String>>> handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        Map<String, String> errors = new HashMap<>();

        e.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });

        ApiResponse<Map<String, String>> response = new ApiResponse<>();
        response.setCode(ErrorCode.REGISTER_FAILED.getCode());
        response.setData(errors);

        return ResponseEntity.status(ErrorCode.REGISTER_FAILED.getStatusCode()).body(response);
    }


}