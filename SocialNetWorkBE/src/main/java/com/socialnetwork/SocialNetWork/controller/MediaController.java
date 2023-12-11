package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.service.MediaService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RequestMapping("/api/v1/media")
@RestController
public class MediaController {
    @Autowired
    public MediaService mediaService;
    @GetMapping("")
    public ResponseEntity<?> getListMediaById(@RequestParam String id , @RequestParam int limit){
        try {
            if(id.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("userId not exist"));
            }
            List<Media> result = mediaService.getListImageMedia(id,limit);
            return result == null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data does not exist")) :  ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }
    @GetMapping("/getListMediaByPost/{id}")
    public ResponseEntity<?> getListMediaByPost(@PathVariable int id){
        try {
            if(id <= 0){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("userId not exist"));
            }
            List<Media> result = mediaService.getListMediaByPost(id);
            return result == null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data does not exist")) :  ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    @PostMapping("/add")
    public ResponseEntity<?> addMedia(@RequestBody String body){
        try{
            // CONVERT JSON TO STRING
            Timestamp createdAt = Timestamp.valueOf(ConvertJSON.converJsonToString(body,"createdAt"));
            String userId = ConvertJSON.converJsonToString(body,"userId");
            String mediaUrl = ConvertJSON.converJsonToString(body,"mediaUrl");
            String mediaType = ConvertJSON.converJsonToString(body,"mediaType");
            String title = ConvertJSON.converJsonToString(body,"title");
            // INIT Media
            if(!userId.isEmpty() && !mediaUrl.isEmpty() && !title.isEmpty()){
                Media media = new Media(userId,mediaUrl,mediaType,createdAt,title,null);
                Media result = mediaService.addMedia(media);
                return ResponseEntity.status(HttpStatus.OK).body(result);
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data cannot be left blank"));
            }
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    };
}
