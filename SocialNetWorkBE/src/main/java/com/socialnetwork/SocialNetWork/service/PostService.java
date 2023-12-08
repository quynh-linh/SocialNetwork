package com.socialnetwork.SocialNetWork.service;
import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.model.IMPL.PostById;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public interface PostService {
    public List<PostById> getListPost(String userId);
    public List<PostById> getListPostByUserId(String userId);
    public Post addPost(Post post);
    public void deletePostByUser(int postId, String userId);

}
