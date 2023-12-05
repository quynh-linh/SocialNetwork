package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Likes;
import com.socialnetwork.SocialNetWork.repository.LikesRepository;
import com.socialnetwork.SocialNetWork.service.LikesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

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
    public int checkUserLiked(String userId){
        try{
            int check = likesRepository.checkUserLiked(userId);
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
    public void deleteLikeByUser(String userId) {
        try {
            if (!userId.isEmpty()) {
                likesRepository.deleteLikeByUser(userId);
                System.out.println("Deletion successful!");
            }
        } catch (DataAccessException e) {
            System.err.println("Deletion failed. Error: " + e.getMessage());
            e.printStackTrace();
        }
    }
    // get count like by post
    @Override
    public int getCountLikeByPost(String postId){
        try {
            if(!postId.isEmpty()){
                int count = likesRepository.getCountLikeByPost(postId);
                return count;
            }
            return 0;
        }catch (DataAccessException e){
            System.err.println("Get count like. Error: " + e.getMessage());
            e.printStackTrace();
        }
        return 0;
    }

}

