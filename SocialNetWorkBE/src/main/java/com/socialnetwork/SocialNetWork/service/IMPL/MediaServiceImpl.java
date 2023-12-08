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

import javax.xml.crypto.Data;
import java.sql.Timestamp;
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
    public List<Media> getListImageMedia(String id , int limit) {
        ArrayList<Media> result = (ArrayList<Media>) postRepository.getListImageMedia(id,limit);
        if(!result.isEmpty()){
            return result;
        }
        return null;
    }

    @Override
    public List<Media> getListMediaByPost(int postId){
        try {
            ArrayList<Media> result = (ArrayList<Media>) postRepository.getListMediaByPost(postId);
            if(result.isEmpty()){
                return null;
            }
            return result;
        }catch (DataAccessException ex){
            ex.printStackTrace();
            return null;
        }
    }

    @Override
    public Media addMedia(Media media) {
        try{
            if(isMediaValid(media)){
                return postRepository.save(media);
            }else {
                return null;
            }
        } catch(DataAccessException ex){
            ex.printStackTrace();
            return null;
        }
    }
    private boolean isMediaValid(Media media) {
        return media != null &&
                media.getTitle() != null && !media.getTitle().isEmpty() &&
                media.getMediaUrl() != null && !media.getMediaUrl().isEmpty() &&
                media.getUserId() != null && !media.getUserId().isEmpty();
    }

    // delete media of post
    @Override
    public void deleteMediaOfPost(List<String> mediaId){
        try {
            postRepository.deleteMediaOfPost(mediaId);
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // update media
    @Override
    public void updateMedia(int id, String mediaUrl, String mediaType, Timestamp createdAt, String title){
        try {
            if(id > 0){
                postRepository.updateMedia(id, mediaUrl, mediaType, createdAt, title);
            }
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }
}
