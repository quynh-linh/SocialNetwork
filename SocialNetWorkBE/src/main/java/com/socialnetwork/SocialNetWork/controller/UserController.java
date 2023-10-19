package com.socialnetwork.SocialNetWork.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.ApiResponse;
import com.socialnetwork.SocialNetWork.model.dto.AuthResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
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
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    };

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id){
        UserDTO result = userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user){
        AuthResponse result = userService.login(user.getEmail(),user.getPassword());
        return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(result.getToken()));
    }

}