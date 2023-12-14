package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.IMPL.PostById;
import com.socialnetwork.SocialNetWork.repository.PostRepository;
import com.socialnetwork.SocialNetWork.repository.UserRepository;
import com.socialnetwork.SocialNetWork.service.PostService;
import com.socialnetwork.SocialNetWork.util.IdGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.sql.Timestamp;
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
    public List<PostById> getListPost(String userId) {
        try {
            ArrayList<PostById> result = (ArrayList<PostById>) postRepository.getListPost(userId);
            if(result.isEmpty()){
                return null;
            } else {
                return result;
            }
        }catch (DataAccessException e){
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public List<PostById> getListPostByUserId(String userId) {
        try {
            ArrayList<PostById> result = (ArrayList<PostById>) postRepository.getListPostByUserId(userId);
            if(result.isEmpty()){
                return null;
            } else {
                return result;
            }
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
    public void deletePostByUser(int postId, String userId){
        try {
            postRepository.deletePostByUser(postId,userId);
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // update post
    @Override
    public void updatePost(String content, Timestamp createdAt, int privacyId, int postId, String userId){
        try{
            if(postId > 0 && !userId.isEmpty()){
                postRepository.updatePost(content, createdAt, privacyId, postId, userId);
            }
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // get content post by ppostId
    @Override
    public String getContentPostByPostId(int postId){
        try{
            if(postId > 0){
                String content = postRepository.getContentPostByPostId(postId);
                if (!content.isEmpty()){
                    return content;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

    // search by post
    @Override
    public List<PostById> searchByPost(String content, int limit){
        try{
            if (!content.isEmpty()){
                ArrayList<PostById> listPost = (ArrayList<PostById>) postRepository.searchByPost(content,limit);
                if (!listPost.isEmpty()){
                    return listPost;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

}

