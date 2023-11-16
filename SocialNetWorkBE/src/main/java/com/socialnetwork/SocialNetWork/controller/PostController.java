package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.service.PostService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.List;

@RequestMapping("/api/v1/post")
@RestController
public class PostController {
    @Autowired
    public PostService postService;

    @PostMapping("/getListPost")
    public ResponseEntity<?> getListPost(@RequestBody String body){
        try {
            String userId = ConvertJSON.converJsonToString(body,"id");
            if(userId.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("userId not exist");
            }
            List<Post> result = postService.getListPost(userId);
            if(result.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data does not exist");
            }
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> addMedia(@RequestBody String body){
        try{
            // CONVERT JSON TO STRING
            Timestamp createdAt = Timestamp.valueOf(ConvertJSON.converJsonToString(body,"createdAt"));
            String content = ConvertJSON.converJsonToString(body,"content");
            String userId = ConvertJSON.converJsonToString(body,"userId");
            int privacyId = Integer.parseInt(ConvertJSON.converJsonToString(body,"privacyId"));
            System.err.println(createdAt + content + userId + privacyId);
            // INIT Media
            if(!content.isEmpty() && !userId.isEmpty() && privacyId > 0){
                Post media = new Post(userId,content,createdAt,null,privacyId);
                return ResponseEntity.status(HttpStatus.OK).body(postService.addPost(media));
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data cannot be left blank"));
            }
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    };
}
