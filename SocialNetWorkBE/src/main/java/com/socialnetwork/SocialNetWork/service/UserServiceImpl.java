package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.model.mapper.UserMapper;
import javassist.NotFoundException;
import lombok.SneakyThrows;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserServiceImpl implements UserService {
    private static final ArrayList<User> users = new ArrayList<User>();
    static {
        users.add(new User("I10S","Quỳnh","Linh","nguyenthanhquynhlinh@gmail.com","123456","119/4A Trần Phú","21-06-2002"));
        users.add(new User("I11S","Phạm","Linh","example@gmail.com","789456","119/4A Hai Trưng","22-06-2002"));
    }
    @Override
    public List<UserDTO> getListUser() {
        ArrayList<UserDTO> result = new ArrayList<UserDTO>();

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
                System.out.println(user);
                return UserMapper.toUserDto(user);
            }
        }
        return null;
    }
}
