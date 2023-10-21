package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.model.mapper.UserMapper;
import com.socialnetwork.SocialNetWork.repository.UserRepository;
import com.socialnetwork.SocialNetWork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    private static final ArrayList<User> users = new ArrayList<User>();
    @Override
    public List<UserDTO> getListUser() {
        ArrayList<User> result = (ArrayList<User>) userRepository.findAll();
        ArrayList<UserDTO> userDTOS = new ArrayList<UserDTO>();

        // Convert users -> result
        for (User user : result) {
            users.add(user);
            userDTOS.add(UserMapper.toUserDto(user));
        }

        return userDTOS;
    }

    @Override
    public void addUser(UserDTO userDTO) {

    }

    @Override
    public UserDTO getUserById(String id){
        for (User user : users) {
            if(user.getId().equals(id)){
                return UserMapper.toUserDto(user);
            }
        }
        return null;
    }
}
