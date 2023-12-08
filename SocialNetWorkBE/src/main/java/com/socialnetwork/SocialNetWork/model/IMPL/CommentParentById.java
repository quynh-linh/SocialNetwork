package com.socialnetwork.SocialNetWork.model.IMPL;

public interface CommentParentById {
    int getCommentId();
    int getParentCommentId();
    int getPostId();
    String getContent();
    String getCreatedAt();
    String getUserId();
    String getFirstName();
    String getLastName();
    String getAvatarUser();
}
