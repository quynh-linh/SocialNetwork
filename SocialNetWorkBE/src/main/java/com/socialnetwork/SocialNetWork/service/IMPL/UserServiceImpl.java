package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.model.mapper.UserMapper;
import com.socialnetwork.SocialNetWork.repository.UserRepository;
import javassist.NotFoundException;
import lombok.SneakyThrows;
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
        ArrayList<UserDTO> result = (ArrayList<UserDTO>) userRepository.findAll();

        // Convert users -> result
        for (User user : users) {
            result.add(UserMapper.toUserDto(user));
        }

        return result;
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
