package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.IMPL.RequestUserFriends;
import com.socialnetwork.SocialNetWork.model.Response.AuthResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.model.IMPL.UserFriendshipStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public List<UserDTO> getListUser();
    public List<String> getListIdUser();
    public List<UserFriendshipStatus> getListSuggestedFriends(String id);
    public List<RequestUserFriends> getUserRequestFriends(String id,String limit);
    public String addUser(User user);
    public UserDTO getUserByToken(String id);
    public AuthResponse login(String email, String password);
    public String updateUser(User user);
    public String updateImageUser(User user);
    public String updateStatusFriend(String receiverId, String senderId, String title);
    public String checkTokenUser(String token);

}
