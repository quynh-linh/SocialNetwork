package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.service.CommentsService;
import com.socialnetwork.SocialNetWork.service.PostService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.Timestamp;
import java.util.List;

@RequestMapping("/api/v1/comments")
@RestController
public class CommentsController {
    @Autowired
    public CommentsService commentsService;

    @PostMapping("/getListCommentByPost")
    public  ResponseEntity<?> getListCommentByPost(@RequestBody String body){
        try {
            int postId = Integer.parseInt(ConvertJSON.converJsonToString(body,"postId"));
            if(postId <= 0){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("postId not exist");
            }
            List<Comments> result = commentsService.getListCommentByPost(postId);
            if(result.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data does not exist");
            }
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    @PostMapping("/getListParentCommentByPost")
    public  ResponseEntity<?> getListParentCommentByPost(@RequestBody String body){
        try {
            int postId = Integer.parseInt(ConvertJSON.converJsonToString(body,"postId"));
            System.err.println((postId));
            if(postId <= 0){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("postId not exist");
            }
            List<Comments> result = commentsService.getListParentCommentByPost(postId);
            if(result.isEmpty()){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Data does not exist");
            }
            return ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }
    @PostMapping("/add")
    public ResponseEntity<?> addComment(@RequestBody String body){
        try{
            // CONVERT JSON TO STRING
            Timestamp createdAt = Timestamp.valueOf(ConvertJSON.converJsonToString(body,"createdAt"));
            String content = ConvertJSON.converJsonToString(body,"content");
            String id = ConvertJSON.converJsonToString(body,"id");
            String userId = ConvertJSON.converJsonToString(body,"userId");
            String parentComment = ConvertJSON.converJsonToString(body,"parentCommentId");
            String checkParentComment = !parentComment.isEmpty() ? parentComment : " ";
            int postId = Integer.parseInt(ConvertJSON.converJsonToString(body,"postId"));
            System.err.println(checkParentComment);
            // INIT Media
            if(!content.isEmpty() && !userId.isEmpty() && postId > 0){
                Comments comments = new Comments(id,userId,postId,checkParentComment,content,createdAt);
                return ResponseEntity.status(HttpStatus.OK).body(commentsService.addComments(comments));
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data cannot be left blank"));
            }
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    };


}
