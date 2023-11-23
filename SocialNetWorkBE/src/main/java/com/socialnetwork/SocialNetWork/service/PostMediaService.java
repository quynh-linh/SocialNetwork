package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.PostMedia;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PostMediaService {
    public String addPostMedia(PostMedia postMedia);
    public List<String> getListMediaIdByPost(String postId);
    public void deletePostMediaByPost(String postId);
}
