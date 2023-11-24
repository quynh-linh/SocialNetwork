package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Media;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MediaService {
    public List<Media> getListImageMedia(String id , int limit);
    public Media addMedia(Media media);

    public List<Media> getListMediaByPost(int postId);
}
