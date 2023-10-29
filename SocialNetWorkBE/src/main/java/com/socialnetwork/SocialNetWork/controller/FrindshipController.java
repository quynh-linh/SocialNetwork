package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Frindship;
import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.service.FrindshipService;
import com.socialnetwork.SocialNetWork.service.UserService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;

@RequestMapping("/api/v1/frindship")
@RestController
public class FrindshipController {
    @Autowired
    public FrindshipService frindshipService;

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody String body){
        try{
            // CONVERT JSON TO STRING
            Timestamp createdAt = Timestamp.valueOf(ConvertJSON.converJsonToString(body,"createdAt"));
            String receiverId = ConvertJSON.converJsonToString(body,"receiverId");
            String senderId = ConvertJSON.converJsonToString(body,"senderId");
            // INIT FRINDSHIP
            Frindship frindship = new Frindship(senderId,receiverId,createdAt,null,null,1);
            String result = frindshipService.addFrindship(frindship);
            if(result.equals("success")){
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(result));
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("error add"));
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    };
}
