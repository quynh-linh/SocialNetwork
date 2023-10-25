package com.socialnetwork.SocialNetWork.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserFriendshipStatus {
    private String id;

    private String firstName;

    private String lastName;

    private String email;

    private String address;

    private String dateOfBirth;

    private String image;

    private String status;
}
