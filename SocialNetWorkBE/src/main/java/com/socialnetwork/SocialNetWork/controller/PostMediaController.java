package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.PostMedia;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.service.PostMediaService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/api/v1/post_media")
@RestController
public class PostMediaController {
    @Autowired
    public PostMediaService postMediaService;

    @PostMapping("/add")
    public ResponseEntity<?> addMedia(@RequestBody String body){
        try{
            // CONVERT JSON TO STRING
            int media_id = Integer.parseInt(ConvertJSON.converJsonToString(body,"media_id"));
            int post_id  =  Integer.parseInt(ConvertJSON.converJsonToString(body,"post_id"));
            // INIT Media
            if (media_id > 0 && post_id > 0){
                PostMedia media = new PostMedia(media_id,post_id);
                String result = postMediaService.addPostMedia(media);
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse(result));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse("error"));
            }
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    };
}
