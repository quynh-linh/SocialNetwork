package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentById;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentParentById;
import com.socialnetwork.SocialNetWork.repository.CommentsRepository;
import com.socialnetwork.SocialNetWork.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

@Component
public class CommentsServiceImpl implements CommentsService {
    private final CommentsRepository commentsRepository;

    @Autowired
    public CommentsServiceImpl(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }

    @Override
    public Comments addComments(Comments comments) {
        try{
            if(!comments.getContent().isEmpty() && !comments.getUserId().isEmpty() && comments.getPostId() > 0){
                return commentsRepository.save(comments);
            } else {
                return  null;
            }
        } catch(DataAccessException ex){
            ex.printStackTrace();
            return null;
        }
    }
    @Override
    public List<CommentById> getListCommentByPost(int postId,int limmit){
        try{
            ArrayList<CommentById> result = (ArrayList<CommentById>) commentsRepository.getListCommentByPost(postId,limmit);
            if(result.isEmpty()){
                return null;
            }
            return result;
        }catch (DataAccessException ex){
            ex.printStackTrace();
            return null;

        }
    }

    @Override
    public List<CommentParentById> getListParentCommentByPost(int postId,int commentId , int limit){
        try{
            ArrayList<CommentParentById> result = (ArrayList<CommentParentById>) commentsRepository.getListParentCommentByPost(postId,commentId,limit);
            if(result.isEmpty()){
                return null;
            }
            return result;
        }catch (DataAccessException ex){
            ex.printStackTrace();
            return null;

        }
    }

    // check comment child exits
    @Override
    public int checkCommentChild(String id){
        try {
            int check =  commentsRepository.checkCommentChild(id);
            System.err.println(check);
            if(check > 0){
                return check;
            }
            return 0;
        }catch (DataAccessException e){
            e.printStackTrace();
            return 0;
        }
    }

    // delete comment
    @Override
    @Transactional
    public void deleteComment(String id) {
        try {
            commentsRepository.deleteComment(id);
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // delete comment child
    @Override
    @Transactional
    public void deleteCommentChild(String id){
        try {
            commentsRepository.deleteCommentChild(id);
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // update comment
    @Override
    @Transactional
    public String updateComment(String content, int id){
        try {
            int update = commentsRepository.updateComment(content,id);
            if(update > 0){
                return "update success";
            }
        }catch (DataAccessException e) {
            e.printStackTrace();
        }
        return "error";
    }


    // get count comment parent by post
    @Override
    @Transactional
    public int getCountCommentParentByPost(String postId){
        try{
            int count = commentsRepository.getCountCommentParentByPost(postId);
            return count;
        }catch (DataAccessException e){
            e.printStackTrace();
        }
        return 0;
    }

    // get count comment child by post
    @Override
    @Transactional
    public int getCountCommentChildByPost(String postId, String commentId){
        try{
            int count = commentsRepository.getCountCommentChildByPost(postId, commentId);
            return count;
        }catch (DataAccessException e){
            e.printStackTrace();
        }
        return 0;
    }

    // check Comment Exits In Post
    @Override
    @Transactional
    public int checkCommentExitsInPost(int postId){
        try{
            int check = 0;
            if(postId > 0){
                check = commentsRepository.checkCommentExitsInPost(postId);

            }
            return check;

        }catch (DataAccessException e){
            e.printStackTrace();
            return 0;
        }
    }

    // delete All Comment In Post
    @Override
    @Transactional
    public void deleteAllCommentParentInPost(int postId){
        try {
            if(postId > 0){
                commentsRepository.deleteAllCommentParentInPost(postId);
            }
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // get List id Comment By Post
    @Override
    public  List<String> getListIdCommentByPost(int postId){
        try{
            if(postId > 0){
                ArrayList<String> result = (ArrayList<String>) commentsRepository.getListIdCommentByPost(postId);
                if(result.isEmpty()){
                    return null;
                }
                return result;
            }
        }catch (DataAccessException e){
            e.printStackTrace();

        }
        return null;
    }

    // delete All Comment Child In Post
    @Override
    public void deleteAllCommentChildInPost(List<String> commentId){
        try{
            commentsRepository.deleteAllCommentChildInPost(commentId);
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // get UserId By Parent Comment
    @Override
    public String getUserIdByParentComment(int parentCommentId){
        try{
            if (parentCommentId > 0){
                String id = commentsRepository.getUserIdByParentComment(parentCommentId);
                if (!id.isEmpty()){
                    return id;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

}



