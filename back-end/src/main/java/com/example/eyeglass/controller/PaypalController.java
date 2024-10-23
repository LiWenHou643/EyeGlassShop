package com.example.eyeglass.controller;

import com.example.eyeglass.config.Authentication.JwtGenerator;
import com.example.eyeglass.config.Authentication.JwtUtils;
import com.example.eyeglass.dto.response.ApiResponse;
import com.example.eyeglass.dto.response.PaymentResponse;
import com.example.eyeglass.entity.Person;
import com.example.eyeglass.exception.AppException;
import com.example.eyeglass.exception.ErrorCode;
import com.example.eyeglass.repository.person.PersonRepository;
import com.example.eyeglass.service.PaypalService;
import com.example.eyeglass.service.person.PersonService;
import com.paypal.api.payments.Payment;
import com.paypal.base.rest.PayPalRESTException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

import static lombok.AccessLevel.PRIVATE;

@RestController
@FieldDefaults(level = PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class PaypalController {
    PaypalService paypalService;
    JwtGenerator jwtGenerator;
    private final JwtUtils jwtUtils;
    private final PersonService personService;
    private final PersonRepository personRepository;

    @PostMapping("/payment/create")
    @PreAuthorize("hasAuthority('SCOPE_USER')")
    public ApiResponse<PaymentResponse> createPayment() {
        try {
            String username = SecurityContextHolder.getContext().getAuthentication().getName();
            Optional<Person> person = personRepository.findByEmail(username);
            if (person.isEmpty()) {
                return ApiResponse.<PaymentResponse>builder()
                                  .message("User not found")
                                  .code(404)
                                  .build();
            }
            String jwt = jwtGenerator.generatePaypalToken(person.get());

            final String cancelUrl = "http://localhost:8080/payment/cancel";
            final String successUrl = "http://localhost:8080/payment/success?accessToken=%s".formatted(jwt);
            Payment payment = paypalService.createPaymentLink(
                    40.00, "USD", "paypal", "sale", "Payment description", cancelUrl, successUrl);

            return payment.getLinks().stream()
                          .filter(link -> "approval_url".equals(link.getRel()))
                          .findFirst()
                          .map(link -> ApiResponse.<PaymentResponse>builder()
                                                  .data(PaymentResponse.builder().paymentUrl(link.getHref()).build())
                                                  .message("Payment created")
                                                  .build())
                          .orElse(ApiResponse.<PaymentResponse>builder()
                                             .message("Approval URL not found")
                                             .code(400)
                                             .build());
        } catch (PayPalRESTException e) {
            // Log the error and return a meaningful response
            return ApiResponse.<PaymentResponse>builder()
                              .message("Error creating payment: %s".formatted(e.getMessage()))
                              .code(500)
                              .build();
        } catch (ClassCastException e) {
            return ApiResponse.<PaymentResponse>builder()
                              .message("Authentication error: %s".formatted(e.getMessage()))
                              .code(403)
                              .build();
        }
    }

    @GetMapping("/payment/success")
    public ApiResponse<String> successPayment(@RequestParam(name = "accessToken") String accessToken, @RequestParam(name = "paymentId") String paymentId, @RequestParam(name = "PayerID") String payerId) {
        try {
            Jwt jwt = jwtUtils.getToken(accessToken);
            boolean isExpired = jwtUtils.isExpired(jwt);
            boolean isInvalidated = jwtUtils.isInvalidated(jwt);
            if (isExpired) {
                throw new AppException(ErrorCode.JWT_EXPIRED);
            } else if (isInvalidated) {
                throw new AppException(ErrorCode.JWT_INVALID);
            }

            Payment payment = paypalService.executePayment(paymentId, payerId);
            if ("approved".equals(payment.getState())) {
                return ApiResponse.<String>builder()
                                  .data("Payment approved")
                                  .message("Payment approved")
                                  .build();
            } else {
                return ApiResponse.<String>builder()
                                  .data("Payment not approved")
                                  .message("Payment not approved")
                                  .code(400)
                                  .build();
            }
        } catch (PayPalRESTException e) {
            // Log the error (consider using a logging framework)
            throw new RuntimeException(e);
        }
    }


}