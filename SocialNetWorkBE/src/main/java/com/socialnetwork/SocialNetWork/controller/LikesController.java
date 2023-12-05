package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Likes;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.service.LikesService;
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

    @PostMapping("/addLike")
    public ResponseEntity<?> addLikes(@RequestBody String body){
        try{
            // CONVERT JSON TO STRING
            //String id = IdGenerator.generateUniqueId();
            String userId = ConvertJSON.converJsonToString(body,"user_id");
            String postId = ConvertJSON.converJsonToString(body,"post_id");
            Timestamp createAt = Timestamp.valueOf(ConvertJSON.converJsonToString(body, "created_at"));
            // INIT LIKE
            if(!userId.isEmpty() && !postId.isEmpty()){
                int check = likesService.checkUserLiked(userId);
                if(check <= 0){
                    Likes like = new Likes(userId,postId,createAt);
                    Likes result = likesService.addLike(like);
                    return result != null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("success")) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("error"));
                }else{
                    likesService.deleteLikeByUser(userId);
                    return null;
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
                int count = likesService.getCountLikeByPost(postId);
                String a = String.valueOf(count);
                return count > 0 ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(a)) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Error"));
            }
            return null;
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
}

