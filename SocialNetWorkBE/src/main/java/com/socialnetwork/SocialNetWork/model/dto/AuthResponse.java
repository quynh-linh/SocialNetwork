package com.socialnetwork.SocialNetWork.model.dto;

import lombok.Getter;

@Getter
public class AuthResponse {
    private final String token;

    public AuthResponse(String token) {
        this.token = token;
    }
}
