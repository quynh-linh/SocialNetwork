package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentById;
import com.socialnetwork.SocialNetWork.model.Response.ApiResponse;
import com.socialnetwork.SocialNetWork.service.CommentsService;
import com.socialnetwork.SocialNetWork.util.ConvertJSON;
import com.socialnetwork.SocialNetWork.util.IdGenerator;
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
            String id = IdGenerator.generateUniqueId();
            Timestamp createdAt = Timestamp.valueOf(ConvertJSON.converJsonToString(body,"createdAt"));
            String content = ConvertJSON.converJsonToString(body,"content");
            String userId = ConvertJSON.converJsonToString(body,"userId");
            String parentComment = ConvertJSON.converJsonToString(body,"parentCommentId");
            String checkParentComment = !parentComment.isEmpty() ? parentComment : null;
            int postId = Integer.parseInt(ConvertJSON.converJsonToString(body,"postId"));
            System.err.println(checkParentComment);
            // INIT Media
            if(!content.isEmpty() && !userId.isEmpty() && postId > 0){
                Comments comments = new Comments(id,userId,postId,checkParentComment,content,createdAt);
                Comments result = commentsService.addComments(comments);
                return result != null ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("success")) : ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("error"));
            } else {
                return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Data cannot be left blank"));
            }
        } catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    @GetMapping("/deleteComment")
    public ResponseEntity<?> deleteComment(@RequestBody String body){
        try {
            String commentId = ConvertJSON.converJsonToString(body,"commentId");
            int checkCommentChild = commentsService.checkCommentChild(commentId);
            System.err.println(checkCommentChild);
            if(checkCommentChild > 0){
                commentsService.deleteCommentChild(commentId);
            }
            commentsService.deleteComment(commentId);
            return ResponseEntity.status(HttpStatus.OK).body("Delete success");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occured");
        }
    }

    // update comment
    @GetMapping("/updateComment")
    public ResponseEntity<?> updateComment(@RequestBody String body){
        try {
            String content = ConvertJSON.converJsonToString(body,"content");
            String createdAt = ConvertJSON.converJsonToString(body,"createdAt");
            String id = ConvertJSON.converJsonToString(body,"id");
            if(!id.isEmpty() && !content.isEmpty()){
                String result = commentsService.updateComment(content,createdAt,id);
                if(result.equals("update success")){
                    return ResponseEntity.status(HttpStatus.OK).body("Update success");
                }
            }
            return ResponseEntity.status(HttpStatus.OK).body("Update failure");
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occured");
        }
    }

    // get count comment parent by post
    @GetMapping("/getCountCommentParentByPost")
    public ResponseEntity<?> getCountCommentParentByPost(@RequestParam String postId){
        try{
            int count = commentsService.getCountCommentParentByPost(postId);
            return count < 0 ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("comments isEmpty")) : ResponseEntity.status(HttpStatus.OK).body(count);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

    // get count comment child by post
    @GetMapping("/getCountCommentChildByPost")
    public ResponseEntity<?> getCountCommentChildByPost(@RequestParam String postId, @RequestParam String commentId){
        try{
            int count = commentsService.getCountCommentChildByPost(postId, commentId);
            return count < 0 ? ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("comments isEmpty")) : ResponseEntity.status(HttpStatus.OK).body(count);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error occurred");
        }
    }

}
