package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentById;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.service.CommentsService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;

@RequestMapping("/api/v1/comments")
@RestController
public class CommentsController {
    @Autowired
    public CommentsService commentsService;

    @GetMapping("/getListCommentByPost")
    public  ResponseEntity<?> getListCommentByPost(@RequestParam int postId,@RequestParam int limit){
        try {
            System.err.println(postId + " cc " + limit);
            if(postId <= 0){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("postId not exist"));
            }
            List<CommentById> result = commentsService.getListCommentByPost(postId,limit);
            return result == null ?  ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("No comments")) : ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
        }
    }

    @GetMapping("/getListParentCommentById")
    public  ResponseEntity<?> getListParentCommentByPost(@RequestParam int postId,@RequestParam int limit,@RequestParam int commentId){
        try {
            if(postId <= 0){
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("postId not exist"));
            }
            List<CommentById> result = commentsService.getListParentCommentByPost(postId,commentId,limit);
            return result == null ?  ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data does not exist")) : ResponseEntity.status(HttpStatus.OK).body(result);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse("Error occurred"));
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
