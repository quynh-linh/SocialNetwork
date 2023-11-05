package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.dto.UserDTO;
import com.socialnetwork.SocialNetWork.model.mapper.UserMapper;
import com.socialnetwork.SocialNetWork.repository.MediaRepository;
import com.socialnetwork.SocialNetWork.repository.PostRepository;
import com.socialnetwork.SocialNetWork.service.MediaService;
import com.socialnetwork.SocialNetWork.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class MediaServiceImpl implements MediaService {
    private final MediaRepository postRepository;

    @Autowired
    public MediaServiceImpl(MediaRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public List<Media> getListMedia(String id , String limit) {
        int convertLimit = Integer.parseInt(limit);
        ArrayList<Media> result = (ArrayList<Media>) postRepository.getListMedia(id,convertLimit);
        if(!result.isEmpty()){
            return result;
        }
        return null;
    }

    @Override
    public String addMedia(Media media) {
        try{
            System.err.println("URL:"+ media.getMediaUrl() +"ID"+ media.getUserId() + "Title:" + media.getTitle());
            if(isMediaValid(media)){
                postRepository.save(media);
                return "success";
            }else {
                return "Invalid media data";
            }
        } catch(DataAccessException ex){
            ex.printStackTrace();
            return "error";
        }
    }
    private boolean isMediaValid(Media media) {
        return media != null &&
                media.getTitle() != null && !media.getTitle().isEmpty() &&
                media.getMediaUrl() != null && !media.getMediaUrl().isEmpty() &&
                media.getUserId() != null && !media.getUserId().isEmpty();
    }
}
