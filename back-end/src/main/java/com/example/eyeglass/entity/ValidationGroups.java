package com.example.eyeglass.entity;


import jakarta.validation.groups.Default;

public interface ValidationGroups {

    interface Create extends Default {
    }

    interface Login extends Default {
    }

    interface Update extends Default {
    }
}