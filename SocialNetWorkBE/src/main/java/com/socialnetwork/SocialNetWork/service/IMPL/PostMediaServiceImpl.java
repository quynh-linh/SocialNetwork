package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.PostMedia;
import com.socialnetwork.SocialNetWork.repository.PostMediaRepository;
import com.socialnetwork.SocialNetWork.service.PostMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

@Component
public class PostMediaServiceImpl implements PostMediaService {
    private final PostMediaRepository postMediaRepository;

    @Autowired
    public PostMediaServiceImpl(PostMediaRepository postMediaRepository) {
        this.postMediaRepository = postMediaRepository;
    }
    @Override
    public String addPostMedia(PostMedia postMedia) {
        try{
            if(postMedia.getMediaId() > 0 && postMedia.getPostId() > 0){
                postMediaRepository.save(postMedia);
                return "success";
            } else {
                return  "error";
            }
        } catch(DataAccessException ex){
            ex.printStackTrace();
            return "error";
        }
    }
}
