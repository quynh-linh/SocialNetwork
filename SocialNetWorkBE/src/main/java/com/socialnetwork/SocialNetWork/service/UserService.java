package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.AuthResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public List<UserDTO> getListUser();
    public List<String> getListIdUser();
    public String addUser(User user);
    public UserDTO getUserByToken(String id);
    public AuthResponse login(String email, String password);
    public String updateUser(User user);
    public String checkTokenUser(String token);

}
