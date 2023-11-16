package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.entity.Media;
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
    public List<Comments> getListCommentByPost(int postId){
        try{
            ArrayList<Comments> result = (ArrayList<Comments>) commentsRepository.getListCommentByPost(postId);
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
    public List<Comments> getListParentCommentByPost(int postId){
        try{
            ArrayList<Comments> result = (ArrayList<Comments>) commentsRepository.getListParentCommentByPost(postId);
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
