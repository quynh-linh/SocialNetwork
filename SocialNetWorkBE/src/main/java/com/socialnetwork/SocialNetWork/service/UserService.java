package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.IMPL.UserById;
import com.socialnetwork.SocialNetWork.model.Response.AuthResponse;
import com.socialnetwork.SocialNetWork.model.Response.RespSuccessUser;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface UserService {
    public List<UserDTO> getListUser();
    public List<String> getListIdUser();
    public List<UserDTO> getListSuggestedFriends(String id,String limit);
    public List<UserDTO> getListUserRequestSent(String id,String limit);
    public List<UserDTO> getListUserVerifyRequest(String id,String limit);
    public List<UserDTO> getListUserFriends(String id,int limit);
    public List<UserById> getListUserBySearch(String userId, String name, int limit);
    public UserDTO getDetailUserById(String id);
    public RespSuccessUser addUser(User user);
    public UserDTO getUserByToken(String id);
    public AuthResponse login(String email, String password);
    public String updateUser(User user);
    public String updateImageUser(User user);
    public String updateStatusFriend(String updateAt , String delectedAt,String senderId , String receiverID , String title);
    public String checkTokenUser(String token);
    public List<String> getListUserIdFriends(String userId);
    public String getUserIdByPost(int postId);
    public String getImageUserByUserId(String userId);
}

