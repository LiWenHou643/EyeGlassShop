package com.example.eyeglass.service.product;

import com.example.eyeglass.dto.request.CodeCheckRequest;
import com.example.eyeglass.dto.response.CodeCheckResponse;
import com.example.eyeglass.entity.Code;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.repository.product.CodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import static com.example.eyeglass.exception.ErrorCode.PROMOTION_CODE_INVALID;

@Service
@RequiredArgsConstructor
public class CodeService {
    private final CodeRepository codeRepository;

    public CodeCheckResponse checkCode(CodeCheckRequest request) {
        Code code = codeRepository.findByCode(request.code())
                                  .orElseThrow(() -> new AppException(PROMOTION_CODE_INVALID));
        return CodeCheckResponse.builder()
                                .promoCode(code.getCode())
                                .value(code.getValue())
                                .build();
    }
}
