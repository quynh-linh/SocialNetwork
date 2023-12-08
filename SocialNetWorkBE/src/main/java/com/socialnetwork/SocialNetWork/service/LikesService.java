package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Likes;
import com.socialnetwork.SocialNetWork.model.Response.GetLikeResponse;
import org.springframework.stereotype.Service;

@Service
public interface LikesService {
    public Likes addLike(Likes like);
    public int checkUserLiked(String userId,int postId);
    public void deleteLikeByUser(String userId,int postId);
    public GetLikeResponse getCountLikeByPost(String postId);
    public void deleteLikesInPost(int postId);
    public  int checkLikesExitInPost(int post);

}

