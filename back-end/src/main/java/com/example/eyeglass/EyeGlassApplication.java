package com.example.eyeglass;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

//@SpringBootApplication
@SpringBootApplication
//@EnableJpaAuditing(auditorAwareRef = "auditAwareImpl")
public class EyeGlassApplication {

    public static void main(String[] args) {
        SpringApplication.run(EyeGlassApplication.class, args);
    }
}