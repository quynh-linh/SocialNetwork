package com.socialnetwork.SocialNetWork.service;
import com.socialnetwork.SocialNetWork.entity.Post;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface PostService {
    public List<Post> getListPost(String userId);
    public Post addPost(Post post);
}
