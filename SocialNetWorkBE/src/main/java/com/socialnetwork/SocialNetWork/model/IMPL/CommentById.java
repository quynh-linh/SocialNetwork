package com.socialnetwork.SocialNetWork.model.IMPL;

public interface CommentById {
    int getCommentId();
    int getPostId();
    String getContent();
    String getCreatedAt();
    String getUserId();
    String getFirstName();
    String getLastName();
    String getAvatarUser();
}
