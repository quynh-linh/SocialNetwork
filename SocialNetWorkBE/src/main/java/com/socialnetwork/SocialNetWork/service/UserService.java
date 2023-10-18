package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public List<UserDTO> getListUser();
    public void addUser(UserDTO userDTO);
    public UserDTO getUserById(String id);
}
