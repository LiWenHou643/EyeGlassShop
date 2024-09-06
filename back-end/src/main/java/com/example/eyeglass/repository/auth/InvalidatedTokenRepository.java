package com.example.eyeglass.repository.auth;

import com.example.eyeglass.entity.InvalidatedToken;
import io.micrometer.common.lang.NonNullApi;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@NonNullApi
@Repository
public interface InvalidatedTokenRepository extends JpaRepository<InvalidatedToken, String> {
    boolean existsByToken(String token);
}