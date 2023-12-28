package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Likes;
import com.socialnetwork.SocialNetWork.entity.Notifications;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.model.Response.GetLikeResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.service.LikesService;
import com.socialnetwork.SocialNetWork.service.NotificationService;
import com.socialnetwork.SocialNetWork.service.PostService;
import com.socialnetwork.SocialNetWork.service.UserService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@RequestMapping("/api/v1/likes")
@RestController
public class LikesController {
    @Autowired
    public LikesService likesService;
    @Autowired
    public UserService userService;
    @Autowired
    public PostService postService;
    @Autowired
    public NotificationService notificationService;

    @PostMapping("/addLike")
    public ResponseEntity<?> addLikes(@RequestBody String body){
        try{
            // CONVERT JSON TO STRING
            //String id = IdGenerator.generateUniqueId();
            String userId = ConvertJSON.converJsonToString(body,"user_id");
            String postId = ConvertJSON.converJsonToString(body,"post_id");
            int parsePostId = Integer.parseInt(postId);
            Timestamp createAt = Timestamp.valueOf(ConvertJSON.converJsonToString(body, "created_at"));
            // INIT LIKE
            if(!userId.isEmpty() && !postId.isEmpty()){
                int check = likesService.checkUserLiked(userId,parsePostId);
                if(check <= 0){
                    Likes like = new Likes(userId,postId,createAt);
                    Likes result = likesService.addLike(like);
                    String userIdNotification = userService.getUserIdByPost(parsePostId);
                    UserDTO userDTO = userService.getDetailUserById(userId);
                    String imageUser = userService.getImageUserByUserId(userId);
                    if(userIdNotification != null && userDTO != null){
                        if(!userIdNotification.equals(userId)){
                            String contentPost = postService.getContentPostByPostId(parsePostId);
                            String contentNotification = " vừa like bài viết của bạn : " + contentPost;
                            String nameUser = userDTO.getFirstName() + " " + userDTO.getLastName();
                            Notifications notifications = new Notifications(userIdNotification,nameUser,contentNotification, createAt,parsePostId,0,imageUser);
                            notificationService.addNotification(notifications);
                        }
                    }
                    return result != null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("success")) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("error"));
                }else{
                    likesService.deleteLikeByUser(userId,Integer.parseInt(postId));
                    return  ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("unLike"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data cannot be left blank"));
            }
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    @GetMapping("/getCountLikeByPost")
    public ResponseEntity<?> getCountLikeByPost(@RequestParam String postId){
        try{
            if(!postId.isEmpty()){
                GetLikeResponse count = likesService.getCountLikeByPost(postId);
                return count != null ? ResponseEntity.status(HttpStatus.OK).body(count) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("No data"));
            }
            return null;
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
}


