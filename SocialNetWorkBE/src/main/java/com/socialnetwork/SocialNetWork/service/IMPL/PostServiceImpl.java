package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.repository.PostRepository;
import com.socialnetwork.SocialNetWork.repository.UserRepository;
import com.socialnetwork.SocialNetWork.service.PostService;
import com.socialnetwork.SocialNetWork.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PostServiceImpl implements PostService{
    private final PostRepository postRepository;

    @Autowired
    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    // get list post display at home
    @Override
    public List<Post> getListPost(String userId) {
        try {
            ArrayList<Post> result = (ArrayList<Post>) postRepository.getListPost(userId);
            if(result.isEmpty()){
                return null;
            }
            return result;
        }catch (DataAccessException e){
            e.printStackTrace();
        }
        return  null;
    }

    // get list post display at profile
    @Override
    public List<Post> getListPostOfUser(String userId){
        try{
            ArrayList<Post> result = (ArrayList<Post>) postRepository.getListPostOfUser(userId);
            if(result.isEmpty()){
                return null;
            }
            return result;
        }catch (DataAccessException e){
            e.printStackTrace();
        }
        return null;
    }


    // create post
    @Override
    public Post addPost(Post post) {
        try{
            if(post.getPrivacyId() > 0 && !post.getContent().isEmpty() && !post.getUserId().isEmpty()){
                return postRepository.save(post);
            } else {
                return  null;
            }
        } catch(DataAccessException ex){
            ex.printStackTrace();
            return null;
        }
    }

    // delete post
    @Override
    public void deletePost(String postId){
        try{
           postRepository.deletePost(postId);
        } catch(DataAccessException ex){
            ex.printStackTrace();
        }
    }
}
