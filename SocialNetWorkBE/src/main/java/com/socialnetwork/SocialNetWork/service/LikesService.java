package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Likes;
import org.springframework.stereotype.Service;

@Service
public interface LikesService {
    public Likes addLike(Likes like);
    public int checkUserLiked(String userId);
    public void deleteLikeByUser(String userId);
    public int getCountLikeByPost(String postId);
}

