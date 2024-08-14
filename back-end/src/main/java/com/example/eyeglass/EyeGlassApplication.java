package com.example.eyeglass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

//@SpringBootApplication
@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class EyeGlassApplication {

    public static void main(String[] args) {
        SpringApplication.run(EyeGlassApplication.class, args);
    }

}
