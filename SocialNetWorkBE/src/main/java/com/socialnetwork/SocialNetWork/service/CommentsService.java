package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentById;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public interface CommentsService {
    public Comments addComments(Comments comments);

    public List<CommentById> getListCommentByPost(int postId, int limit);

    public List<CommentById> getListParentCommentByPost(int postId,int commentId , int limit);

    public int checkCommentChild(String id);

    public void deleteComment(String id);

    public void deleteCommentChild(String id);

    public String updateComment(String content, String createdAt, String id);

    public int getCountCommentParentByPost(String postId);

    public int getCountCommentChildByPost(String postId, String commentId);

    public int checkCommentExitsInPost(int postId);

    public void deleteAllCommentParentInPost(int postId);

    public  List<String> getListIdCommentByPost(int postId);

    public void deleteAllCommentChildInPost(List<String> commentId);
}
