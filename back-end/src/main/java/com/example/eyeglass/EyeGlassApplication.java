package com.example.eyeglass;

import com.example.eyeglass.config.RSAKeyRecord;
import lombok.NonNull;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

//@SpringBootApplication
@SpringBootApplication
@EnableConfigurationProperties(RSAKeyRecord.class)
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class EyeGlassApplication {

    public static void main(String[] args) {
        SpringApplication.run(EyeGlassApplication.class, args);
    }

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@NonNull CorsRegistry registry) {
                registry.addMapping("/api/**").allowedOrigins("http://localhost:3000")
                        .allowCredentials(true).maxAge(3600)
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With")
                        .exposedHeaders("Authorization", "Content-Type", "Accept", "Origin", "X-Requested-With");
            }
        };
    }
}