package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.Post;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface PostService {
    public List<Media> getListPost(String id , String limit);
    public Post addPost(Post post);
}
