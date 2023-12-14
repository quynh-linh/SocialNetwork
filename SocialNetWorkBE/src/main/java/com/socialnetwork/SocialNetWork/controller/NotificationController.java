package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Notifications;
import com.socialnetwork.SocialNetWork.model.IMPL.PostById;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.service.NotificationService;
import com.socialnetwork.SocialNetWork.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.Repository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/notifications")
@RestController
public class NotificationController {
    @Autowired
    public NotificationService notificationService;
    @Autowired
    public UserService userService;

    // get notification
    @GetMapping("/getNotification")
    public ResponseEntity<?> getNotification(@RequestParam String userId, @RequestParam int limit){
        try {
            if(userId.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("userId not exits"));
            }
            List<Notifications> result = notificationService.getNotification(userId,limit);
            return result != null ? ResponseEntity.status(HttpStatus.OK).body(result) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data does not exist"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    // get Count Notification Unread
    @GetMapping("/getCountNotificationUnread")
    public ResponseEntity<?> getCountNotificationUnread(@RequestParam String userId){
        try{
            if(userId.isEmpty()){
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("userId not exits"));
            }
            int count = notificationService.getCountNotificationUnread(userId);
            return count >=0 ? ResponseEntity.status(HttpStatus.OK).body(count) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data does not exist"));
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    // update Status Notification Readed
    @GetMapping("/updateStatusNotificationReaDed")
    public ResponseEntity<?> updateStatusNotificationReaDed(@RequestParam int idNotification){
        try {
            if(idNotification <= 0){
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("idNotification not exists"));
            }
            boolean updateResult = notificationService.updateStatusNotificationReaded(idNotification);
            return updateResult
                    ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Update successful"))
                    : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Update failed"));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    // check Notification ReaDed Or Unread
    @GetMapping("/checkNotificationReaDedOrUnread")
    public ResponseEntity<?> checkNotificationReaDedOrUnread(@RequestParam int idNotification){
        try {
            if(idNotification <= 0){
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("idNotification not exists"));
            }
            String check = notificationService.checkNotificationReadedOrUnread(idNotification);
            return check != null
                    ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(check))
                    : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("failed"));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    // from notification to post or user detail
    @GetMapping("/fromNotificationToPostOrUserDetail")
    public ResponseEntity<?> fromNotificationToPostOrUserDetail(@RequestParam int idNotification){
        try {
            if(idNotification <= 0){
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("idNotification not exists"));
            }
            int post_id = notificationService.checkNotificationByPostOrOther(idNotification);
            String user_id = notificationService.getUserIdByNotificationId(idNotification);
            if(post_id > 0){
               PostById result =  notificationService.getDetailPostByNotification(user_id,idNotification);
               return result != null
                        ? ResponseEntity.status(HttpStatus.OK).body(result)
                        : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data does not exist"));
            }
            UserDTO userDTO = userService.getDetailUserById(user_id);
            return userDTO == null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("null")) : ResponseEntity.status(HttpStatus.OK).body(userDTO);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }
}

