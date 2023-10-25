package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.model.Response.AuthResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.model.IMPL.UserFriendshipStatus;
import com.socialnetwork.SocialNetWork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/users")
@RestController
public class UserController {
    @Autowired
    public UserService userService;
    @GetMapping("")
    public ResponseEntity<?> getListUser(){
        List<UserDTO> result = userService.getListUser();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/all")
    public ResponseEntity<?> getListSuggestedFriends(@RequestBody String id){
        List<User> result = userService.getListSuggestedFriends(id);
        if(!result.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED).body(new ApiResponse("error"));
    }
    @GetMapping("/listStatus")
    public ResponseEntity<?> getListUserToStatus(){
        List<UserFriendshipStatus> result = userService.getListUsersToStatus();
        if(!result.isEmpty()){
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("error"));
    }

    @GetMapping("/listId")
    public ResponseEntity<?> getListIdUser(){
        List<String> result = userService.getListIdUser();
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody User user){
        try{
            String result = userService.addUser(user);
            return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(result));
        } catch(Exception e){
            System.err.println(e.toString());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    };

    @PostMapping("/token/{slug}")
    public ResponseEntity<?> getUserByToken(@PathVariable String slug){
        UserDTO result = userService.getUserByToken(slug);
        return ResponseEntity.status(HttpStatus.OK).body(result);
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
}