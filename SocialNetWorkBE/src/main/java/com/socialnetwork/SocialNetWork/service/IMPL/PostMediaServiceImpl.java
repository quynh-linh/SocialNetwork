package com.socialnetwork.SocialNetWork.service.IMPL;
import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.entity.PostMedia;
import com.socialnetwork.SocialNetWork.repository.PostMediaRepository;
import com.socialnetwork.SocialNetWork.service.PostMediaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;
import java.util.ArrayList;
import java.util.List;

@Component
public class PostMediaServiceImpl implements PostMediaService {
    private final PostMediaRepository postMediaRepository;

    @Autowired
    public PostMediaServiceImpl(PostMediaRepository postMediaRepository) {
        this.postMediaRepository = postMediaRepository;
    }

    // get list mediaId by post
    @Override
    public List<String> getListMediaIdByPost(int postId){
        try{
            ArrayList<String> result = (ArrayList<String>) postMediaRepository.getListMediaIdByPost(postId);
            if(result.isEmpty()){
                return null;
            }
            return result;
        }catch (DataAccessException e){
            e.printStackTrace();
        }
        return null;
    }

    // delete postMedia by post
    @Override
    public void deletePostMediaByPost(int postId){
        try{
            postMediaRepository.deletePostMediaByPost(postId);
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // create post media
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
