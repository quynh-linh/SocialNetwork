package com.socialnetwork.SocialNetWork.model.Response;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AuthResponse {
    private final String token;
    private String message;
    private String userID;
    public AuthResponse(String token , String message , String userID) {
        this.token = token;
        this.message = message;
        this.userID = userID;
    }
}
