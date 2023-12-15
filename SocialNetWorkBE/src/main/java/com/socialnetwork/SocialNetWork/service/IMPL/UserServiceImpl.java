package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.IMPL.UserById;
import com.socialnetwork.SocialNetWork.model.Response.AuthResponse;
import com.socialnetwork.SocialNetWork.model.Response.RespSuccessUser;
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
    public List<UserDTO> getListSuggestedFriends(String id,String limit) {
        int convertLimit = Integer.parseInt(limit);
        if(!id.isEmpty() && convertLimit > 0){
            ArrayList<User> listUser = (ArrayList<User>) userRepository.getListSuggestedFriends(id,convertLimit);
            if(!listUser.isEmpty()){
                ArrayList<UserDTO> userDTOS = new ArrayList<UserDTO>();
                // Convert users -> result
                for (User user : listUser) {
                    userDTOS.add(UserMapper.toUserDto(user));
                }
                return userDTOS;
            }
        }
        return null;
    }

    @Override
    public List<UserDTO> getListUserRequestSent(String id,String limit) {
        int convertLimit = Integer.parseInt(limit);
        if(!id.isEmpty() && convertLimit > 0){
            ArrayList<User> result = (ArrayList<User>) userRepository.getUserRequestFriends(id,convertLimit);
            if(!result.isEmpty()){
                ArrayList<UserDTO> userDTOS = new ArrayList<UserDTO>();
                // Convert users -> result
                for (User user : result) {
                    userDTOS.add(UserMapper.toUserDto(user));
                }
                return userDTOS;
            }
        }
        return null;
    }

    @Override
    public List<UserDTO> getListUserVerifyRequest(String id,String limit) {
        int convertLimit = Integer.parseInt(limit);
        if(!id.isEmpty() && convertLimit > 0){
            ArrayList<User> result = (ArrayList<User>) userRepository.getListUserVerifyRequest(id,convertLimit);
            if(!result.isEmpty()){
                ArrayList<UserDTO> userDTOS = new ArrayList<UserDTO>();
                // Convert users -> result
                for (User user : result) {
                    userDTOS.add(UserMapper.toUserDto(user));
                }
                return userDTOS;
            }
        }
        return null;
    }

    @Override
    public List<UserDTO> getListUserFriends(String id, int limit) {
        if(!id.isEmpty() && limit > 0){
            ArrayList<User> result = (ArrayList<User>) userRepository.getListUserFriends(id,limit);
            if(!result.isEmpty()){
                ArrayList<UserDTO> userDTOS = new ArrayList<UserDTO>();
                // Convert users -> result
                for (User user : result) {
                    System.err.println(user);
                    userDTOS.add(UserMapper.toUserDto(user));
                }
                return userDTOS;
            }
        }
        return null;
    }

    // search by name user
    @Override
    public List<UserById> getListUserBySearch(String userId, String name, int limit) {
        try {
            if(!name.isEmpty()){
                ArrayList<UserById> result = (ArrayList<UserById>) userRepository.getListUserBySearch(userId,name,limit);
                if(!result.isEmpty()){
                    return result;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public UserDTO getDetailUserById(String id) {
        if(!id.isEmpty()){
            User result = userRepository.getDetailUserById(id);
            return UserMapper.toUserDto(result);
        }
        return null;
    }

    @Override
    public RespSuccessUser addUser(User user) {
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
            return new RespSuccessUser(uniqueId,"success");
        } catch(DataAccessException ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public UserDTO getUserByToken(String token){
        JwtTokenProvider jwtTokenProvider = new JwtTokenProvider();
        boolean checkToken = jwtTokenProvider.validateToken(token);
        if(checkToken){
            String emailUser = jwtTokenProvider.getUserIdFromJWT(token);
            User user = userRepository.findUserByEmail(emailUser);
            return UserMapper.toUserDto(user);
        }
        return null;
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
            int userDB = userRepository.updateUser(user.getEmail(), user.getFirstName(),user.getLastName(),
                    user.getDateOfBirth(),user.getAddress(),user.getId());
            if(userDB > 0){
                return "success update";
            }
        } catch(DataAccessException e){
            e.printStackTrace();
            return "error";
        }
        return "error";
    }

    @Override
    public String updateImageUser(User user) {
        try{
            int userDB = userRepository.updateImageUser(user.getImage(),user.getId());
            if(userDB > 0){
                return "success update image";
            }
        } catch(DataAccessException e){
            e.printStackTrace();
            return "error";
        }
        return "error";
    }

    @Override
    public String updateStatusFriend(String updateAt , String delectedAt,String senderId , String receiverID , String title) {
        try{
            if(!receiverID.isEmpty() && !senderId.isEmpty()){
                int updateStatusByFriends = 0;
                if(title.equals("confirm")){
                    updateStatusByFriends = userRepository.updateStatusByFriends(2,updateAt, null, senderId, receiverID);
                } else if(title.equals("cancel")) {
                    System.err.println(title);
                    updateStatusByFriends = userRepository.updateStatusByFriends(3, null,delectedAt,senderId, receiverID);
                }
                if(updateStatusByFriends > 0){
                    return "success update";
                }
            }
        } catch(DataAccessException e){
            e.printStackTrace();
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

    // get list userId friend
    @Override
    public List<String> getListUserIdFriends(String userId){
        try{
            if (!userId.isEmpty()){
                ArrayList<String> result = (ArrayList<String>) userRepository.getListUserIdFriends(userId);
                if (result != null){
                    return result;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

    // get userId by post
    @Override
    public String getUserIdByPost(int postId){
        try {
            if (postId > 0){
                String userId = userRepository.getUserIdByPost(postId);
                if (!userId.isEmpty()){
                    return userId;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

    // get image user by userId
    @Override
    public String getImageUserByUserId(String userId){
        try{
            if (!userId.isEmpty()){
                String imageUser = userRepository.getImageUserByUserId(userId);
                if (!imageUser.isEmpty()){
                    return imageUser;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }
}

