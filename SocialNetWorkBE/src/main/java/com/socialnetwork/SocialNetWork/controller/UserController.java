package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Notifications;
import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.IMPL.UserById;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.model.Response.AuthResponse;
import com.socialnetwork.SocialNetWork.model.Response.RespSuccessUser;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.service.NotificationService;
import com.socialnetwork.SocialNetWork.service.UserService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@RequestMapping("/api/v1/users")
@RestController
public class UserController {
    @Autowired
    public UserService userService;
    @Autowired
    public NotificationService notificationService;
    @GetMapping("")
    public ResponseEntity<?> getListUser(){
        List<UserDTO> result = userService.getListUser();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/listSuggested")
    public ResponseEntity<?> getListSuggestedFriends(@RequestBody String body){
        String id = ConvertJSON.converJsonToString(body,"id");
        String limit = ConvertJSON.converJsonToString(body,"limit");
        List<UserDTO> result = userService.getListSuggestedFriends(id,limit);
        if(!result.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(new ApiResponse("error"));
    }

    @PostMapping("/requestFriends")
    public ResponseEntity<?> getListUserRequestSent(@RequestBody String body){
        try {
            String id = ConvertJSON.converJsonToString(body,"id");
            String limit = ConvertJSON.converJsonToString(body,"limit");
            List<UserDTO> result = userService.getListUserRequestSent(id,limit);
            return result == null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("No data")) : ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    @PostMapping("/verifyRequest")
    public ResponseEntity<?> getListUserVerifyRequest(@RequestBody String body){
        try {
            String id = ConvertJSON.converJsonToString(body,"id");
            String limit = ConvertJSON.converJsonToString(body,"limit");
            List<UserDTO> result = userService.getListUserVerifyRequest(id,limit);
            return result == null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("No data")) : ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    // search by name user
    @GetMapping("/searchByName")
    public ResponseEntity<?> getListUserBySearch(@RequestParam String userId, @RequestParam String name, @RequestParam int limit){
        try {
            if (name.isEmpty() || userId.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse("userId and name is required"));
            }
            ArrayList<UserById> userByIds = (ArrayList<UserById>) userService.getListUserBySearch(userId, name, limit);
            return userByIds == null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("null")) : ResponseEntity.status(HttpStatus.OK).body(userByIds);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }


    @GetMapping("/getDetailUser/{id}")
    public ResponseEntity<?> getDetailUserById(@PathVariable String id){
        try {
            if (id.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse("userId is required"));
            }
            UserDTO userDTO = userService.getDetailUserById(id);
            return userDTO == null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("null")) : ResponseEntity.status(HttpStatus.OK).body(userDTO);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    @PostMapping("/listFriends")
    public ResponseEntity<?> getListUserFriends(@RequestBody String body){
        try {
            String id = ConvertJSON.converJsonToString(body,"id");
            String limit = ConvertJSON.converJsonToString(body,"limit");
            List<UserDTO> result = userService.getListUserFriends(id,Integer.parseInt(limit));
            return result != null ? ResponseEntity.status(HttpStatus.OK).body(result) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("No friends"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user){
        try{
            RespSuccessUser result = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    };

    @PostMapping("/token/{slug}")
    public ResponseEntity<?> getUserByToken(@PathVariable String slug){
        try{
            UserDTO result = userService.getUserByToken(slug);
            return result != null ? ResponseEntity.status(HttpStatus.OK).body(result) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Error"));
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
    @PostMapping("/token/check")
    public ResponseEntity<?> checkToken(@PathVariable String slug){
        String result = userService.checkTokenUser(slug);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(result));
    }
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        AuthResponse result = userService.login(user.getEmail(),user.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body(new AuthResponse(result.getToken(),result.getMessage(), result.getUserID()));
    }
    @PostMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody User user){
        String result = userService.updateUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(result));
    }

    @PostMapping("/updateImage")
    public ResponseEntity<?> updateImageUser(@RequestBody User user){
        String result = userService.updateImageUser(user);
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(result));
    }

    @PostMapping("/updateStatus")
    public ResponseEntity<?> updateStatusByFriends(@RequestBody String body){
        try{
            String convertSender = ConvertJSON.converJsonToString(body,"senderId");
            String convertReceiver = ConvertJSON.converJsonToString(body,"receiverId");
            String convertTitle = ConvertJSON.converJsonToString(body,"title");
            String updateAt = ConvertJSON.converJsonToString(body,"updateAt");
            String delectedAt = ConvertJSON.converJsonToString(body,"delectedAt");
            System.err.println("u:"+updateAt+"d:"+delectedAt+"s:"+convertSender+"r:"+convertReceiver+"t"+convertTitle);
            if(convertTitle.equals("confirm")){
                UserDTO userDTO = userService.getDetailUserById(convertReceiver);
                String imageUser = userService.getImageUserByUserId(convertReceiver);
                if (userDTO != null && imageUser != null){
                    String contentNotification =" đã chấp nhận lời mời kết bạn của bạn ";
                    String nameUser = userDTO.getFirstName() + " " + userDTO.getLastName();
                    Notifications notifications = new Notifications(convertSender,nameUser,contentNotification, Timestamp.valueOf(updateAt),0,0,imageUser);
                    notificationService.addNotification(notifications);
                }
            }
            String result = userService.updateStatusFriend(updateAt,delectedAt,convertSender,convertReceiver,convertTitle);
            return result.equals("success update") ?  ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(result)) : ResponseEntity.status(HttpStatus.NOT_FOUND).body("Error");
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

}
