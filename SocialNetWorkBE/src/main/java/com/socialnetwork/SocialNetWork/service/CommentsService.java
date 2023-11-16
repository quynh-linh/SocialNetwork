package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Comments;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentsService {
    public Comments addComments(Comments comments);

    public List<Comments> getListCommentByPost(int postId);

    public List<Comments> getListParentCommentByPost(int postId);
}
