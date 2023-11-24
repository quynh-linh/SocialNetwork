package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentById;
import com.socialnetwork.SocialNetWork.repository.CommentsRepository;
import com.socialnetwork.SocialNetWork.service.CommentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

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
    public List<CommentById> getListParentCommentByPost(int postId,int commentId , int limit){
        try{
            ArrayList<CommentById> result = (ArrayList<CommentById>) commentsRepository.getListParentCommentByPost(postId,commentId,limit);
            if(result.isEmpty()){
                return null;
            }
            return result;
        }catch (DataAccessException ex){
            ex.printStackTrace();
            return null;

        }
    }
}
