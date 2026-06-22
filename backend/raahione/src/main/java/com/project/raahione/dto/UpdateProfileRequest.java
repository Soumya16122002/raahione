package com.project.raahione.dto;

import lombok.Data;

@Data
public class UpdateProfileRequest {

    private String name;
    private String email;
    private String phone;
    private String city;
    private String bio;
}