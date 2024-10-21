package com.example.eyeglass.entity;

public enum OrderStatus {
    PENDING,       // Order has been placed, awaiting confirmation
    COD_PENDING,    // Order is confirmed, awaiting cash payment on delivery
    CONFIRMED,     // Payment has been confirmed
    PROCESSING,    // Order is being prepared for shipment
    SHIPPED,       // Order has been shipped
    DELIVERED,     // Order has been delivered to the customer
    CANCELLED,     // Order has been cancelled
    REFUNDED;      // Order payment has been refunded
}
