package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Media;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public interface MediaService {
    public List<Media> getListImageMedia(String id , int limit);
    public Media addMedia(Media media);
    public List<Media> getListMediaByPost(int postId);
    public void deleteMediaOfPost(List<String> mediaId);
    public void updateMedia(int id, String mediaUrl, String mediaType, Timestamp createdAt, String title);
}
