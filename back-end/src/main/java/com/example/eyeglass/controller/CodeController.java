package com.example.eyeglass.controller;

import com.example.eyeglass.dto.request.CodeCheckRequest;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.CodeCheckResponse;
import com.example.eyeglass.service.product.CodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class CodeController {

    private final CodeService codeService;

    @PostMapping("/code")
    public ApiResponse<CodeCheckResponse> checkCode(@RequestBody CodeCheckRequest request) {
        ApiResponse<CodeCheckResponse> response = new ApiResponse<>();
        response.setData(codeService.checkCode(request));
        return response;
    }
}
