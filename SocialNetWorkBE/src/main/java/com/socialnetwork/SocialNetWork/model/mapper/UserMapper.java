package com.socialnetwork.SocialNetWork.model.mapper;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;

public class UserMapper {
    public static UserDTO toUserDto(User user) {
        UserDTO tmp = new UserDTO();
        tmp.setId(user.getId());
        tmp.setFirstName(user.getFirstName());
        tmp.setLastName(user.getLastName());
        tmp.setEmail(user.getEmail());
        tmp.setAddress(user.getAddress());
        tmp.setDateOfBirth(user.getDateOfBirth());
        tmp.setImage(user.getImage());
        return tmp;
    }
}
