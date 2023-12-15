package com.socialnetwork.SocialNetWork.model.Response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class RespSuccessUser {
    private String uid;
    private String message;
}
