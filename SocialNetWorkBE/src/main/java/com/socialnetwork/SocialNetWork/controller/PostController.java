package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.service.MediaService;
import com.socialnetwork.SocialNetWork.service.PostMediaService;
import com.socialnetwork.SocialNetWork.service.PostService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RequestMapping("/api/v1/post")
@RestController
public class PostController {
    @Autowired
    public PostService postService;
    @Autowired
    public MediaService mediaService;
    @Autowired
    public PostMediaService postMediaService;

    // get list post display at home
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

    // get list post of user display at profile
    @GetMapping("/getListPostOfUser")
    public  ResponseEntity<?> getListPostOfUser(@RequestBody String body){
        try {
            String userId = ConvertJSON.converJsonToString(body, "id");
            if(userId.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("userId not exist");
            }
            List<Post> result = postService.getListPostOfUser(userId);
            if(result.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data does not exit");
            }
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error Occurred");
        }
    }

    // create post
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

    // get list post of user display at profile
    @GetMapping("/deletePost")
    public  ResponseEntity<?> deletePost(@RequestBody String body){
        try {
            String postId = ConvertJSON.converJsonToString(body, "id");
            if(postId.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("userId not exist");
            }
            List<String> mediaId = postMediaService.getListMediaIdByPost(postId);
            if (mediaId != null) {
                postMediaService.deletePostMediaByPost(postId);
                mediaService.deleteMediaOfPost(mediaId);
            }
            postService.deletePost(postId);
            return ResponseEntity.status(HttpStatus.OK).body("delete success !");
        } catch (Exception e) {
            // Handle generic exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
}
