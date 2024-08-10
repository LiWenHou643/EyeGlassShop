package com.example.eyeglass.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.EntityListeners;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
public class BaseEntity {

    @CreatedDate
    @Column(updatable = false, nullable = false)
//    @JsonIgnore
    private LocalDateTime createdAt;

    @CreatedBy
    @Column(updatable = false, nullable = false)
//    @JsonIgnore
    private String createdBy;

    @LastModifiedDate
    @Column(insertable = false)
//    @JsonIgnore
    private LocalDateTime updatedAt;

    @LastModifiedBy
    @Column(insertable = false)
//    @JsonIgnore
    private String updatedBy;
}