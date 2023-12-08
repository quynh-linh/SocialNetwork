package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Likes;
import com.socialnetwork.SocialNetWork.model.IMPL.LikeById;
import com.socialnetwork.SocialNetWork.model.Response.GetLikeResponse;
import com.socialnetwork.SocialNetWork.repository.LikesRepository;
import com.socialnetwork.SocialNetWork.service.LikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LikesServiceImpl implements LikesService {
    private final LikesRepository likesRepository;

    @Autowired
    public LikesServiceImpl(LikesRepository likesRepository){
        this.likesRepository = likesRepository;
    }

    @Override
    public Likes addLike(Likes like){
        try{
            if(!like.getUserId().isEmpty() && !like.getPostId().isEmpty()){
                return likesRepository.save(like);
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

    // check user liked
    @Override
    public int checkUserLiked(String userId,int postId){
        try{
            int check = likesRepository.checkUserLiked(userId,postId);
            if(check > 0){
                return check;
            }
            return 0;
        }catch (DataAccessException e){
            e.printStackTrace();
            return 0;
        }
    }

    // delete like by user
    @Override
    public void deleteLikeByUser(String userId,int postId) {
        try {
            if (!userId.isEmpty()) {
                likesRepository.deleteLikeByUser(userId,postId);
                System.out.println("Deletion successful!");
            }
        } catch (DataAccessException e) {
            System.err.println("Deletion failed. Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    // get count like by post
    @Override
    public GetLikeResponse getCountLikeByPost(String postId){
        try {
            if(!postId.isEmpty()){
                List<LikeById> likeByIds = likesRepository.getCountLikeByPost(postId);
                long total = 0;
                if(likeByIds.size() > 0){
                    for (LikeById item : likeByIds) {
                        total += item.getCount();
                    }
                    return new GetLikeResponse(likeByIds,"success",total);
                }
            } else {
                return null;
            }

        }catch (DataAccessException e){
            System.err.println("Get count like. Error: " + e.getMessage());
        }
        return null;
    }

    // delete all likes in post
    @Override
    public void deleteLikesInPost(int postId){
        try{
            if(postId > 0){
                likesRepository.deleteLikesInPost(postId);
            }
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // check likes exits in post
    @Override
    public  int checkLikesExitInPost(int postId){
        try{
            if (postId > 0){
                int check = likesRepository.checkLikesExitInPost(postId);
                if(check > 0){
                    return check;
                }
                return 0;
            }
        }catch (DataAccessException e){
            e.printStackTrace();
        }
        return 0;
    }

}

