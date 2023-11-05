package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MediaService {
    public List<Media> getListMedia(String id , String limit);
    public String addMedia(Media media);
}
