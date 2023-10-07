package com.socialnetwork.SocialNetWork.entity;

import lombok.*;
import org.springframework.stereotype.Component;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Component
public class User {
    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String password;

    private String address;

    private String dateOfBirth;
}
