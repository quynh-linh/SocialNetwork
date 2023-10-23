package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.AuthResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.model.mapper.UserMapper;
import com.socialnetwork.SocialNetWork.repository.UserRepository;
import com.socialnetwork.SocialNetWork.service.JwtTokenProvider;
import com.socialnetwork.SocialNetWork.service.UserService;
import com.socialnetwork.SocialNetWork.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class UserServiceImpl implements UserService {
    private final  UserRepository userRepository;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public List<UserDTO> getListUser() {
        ArrayList<User> result = (ArrayList<User>) userRepository.findAll();
        ArrayList<UserDTO> userDTOS = new ArrayList<UserDTO>();
        // Convert users -> result
        for (User user : result) {
            userDTOS.add(UserMapper.toUserDto(user));
        }
        return userDTOS;
    }

    @Override
    public List<String> getListIdUser() {
        ArrayList<User> result = (ArrayList<User>) userRepository.findAll();
        ArrayList<String> listID = new ArrayList<>();
        for (User user : result) {
            listID.add(user.getId());
        }
        return listID;
    }

    @Override
    public String addUser(User user) {
        try{
            String uniqueId = IdGenerator.generateUniqueId();
            ArrayList<User> listUsers = (ArrayList<User>) userRepository.findAll();
            for (User item :listUsers) {
                if(item.getId().equals(uniqueId)){
                    uniqueId = IdGenerator.generateUniqueId();
                }
            }
            user.setId(uniqueId);
            userRepository.save(user);
            return "success";
        } catch(DataAccessException ex){
            ex.printStackTrace();
            return "error";
        }
    }

    @Override
    public UserDTO getUserByToken(String token){
        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        String emailUser = jwtTokenProvider.getUserIdFromJWT(token);
        User user = userRepository.findUserByEmail(emailUser);
        return UserMapper.toUserDto(user);
    }

    @Override
    public AuthResponse login(String email, String password) {
        User user = userRepository.findUserByLogin(email, password);
        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        AuthResponse authResponse = null;
        if(user != null){
            String token = jwtTokenProvider.generateToken(user.getEmail());
            authResponse = new AuthResponse(token,"success",user.getId());
        } else {
            authResponse = new AuthResponse("","error" , "");
        }
        return authResponse;
    }

    @Override
    public String updateUser(User user) {
        try{
            System.err.println(user.getEmail()+user.getFirstName()+user.getLastName()+
                    user.getDateOfBirth()+user.getAddress()+user.getId());
            int userDB = userRepository.updateUser(user.getEmail(), user.getFirstName(),user.getLastName(),
                    user.getDateOfBirth(),user.getAddress(),user.getId());
            if(userDB > 0){
                return "success";
            }
        } catch(DataAccessException e){
            e.printStackTrace();
            return "error";
        }
        return "error";
    }

    @Override
    public String checkTokenUser(String token) {
        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        boolean checkToken = jwtTokenProvider.validateToken(token);
        if(checkToken){
            return "exits";
        } else {
            return "not exits";
        }
    }
}
