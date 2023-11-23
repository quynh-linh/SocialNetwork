package com.socialnetwork.SocialNetWork.model.IMPL;

import java.sql.Timestamp;

public interface PostById {
    int getId();
    String getUserID();
    String getMediaId();
    String getContent();
    String getCreatedAt();
    String getDeleteAt();
    int getPrivacyId();
    String getFirstName();
    String getLastName();
    String getAvatarUser();
}
