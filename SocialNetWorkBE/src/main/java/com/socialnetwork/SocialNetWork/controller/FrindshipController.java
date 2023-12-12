package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Frindship;
import com.socialnetwork.SocialNetWork.entity.Notifications;
import com.socialnetwork.SocialNetWork.model.IMPL.CheckStatus;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.service.FrindshipService;
import com.socialnetwork.SocialNetWork.service.NotificationService;
import com.socialnetwork.SocialNetWork.service.UserService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RequestMapping("/api/v1/frindship")
@RestController
public class FrindshipController {
    @Autowired
    public FrindshipService frindshipService;
    @Autowired
    public UserService userService;
    @Autowired
    public NotificationService notificationService;

    @PostMapping("/add")
    public ResponseEntity<?> addUser(@RequestBody String body){
        try{
            // CONVERT JSON TO STRING
            Timestamp createdAt = Timestamp.valueOf(ConvertJSON.converJsonToString(body,"createdAt"));
            String receiverId = ConvertJSON.converJsonToString(body,"receiverId");
            String senderId = ConvertJSON.converJsonToString(body,"senderId");
            //
            UserDTO userDTO = userService.getDetailUserById(senderId);
            String imageUser = userService.getImageUserByUserId(senderId);
            if (userDTO != null && imageUser != null){
                String contentNotification =" đã gửi cho bạn lời mời kết bạn ";
                String nameUser = userDTO.getFirstName() + " " + userDTO.getLastName();
                Notifications notifications = new Notifications(receiverId,nameUser,contentNotification, createdAt,0,0,imageUser);
                notificationService.addNotification(notifications);
            }
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
    @GetMapping("/check")
    public ResponseEntity<?> checkStatusFriends(@RequestParam String current, @RequestParam String other) {
        try {
            if (current.isEmpty() || other.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiResponse("Invalid input"));
            }

            CheckStatus result = frindshipService.checkStatusFriends(current, other);

            if (!result.getFriendshipStatus().isEmpty()) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("Not exists"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

}
