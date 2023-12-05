package com.socialnetwork.SocialNetWork.model.IMPL;

import lombok.Getter;
import lombok.Setter;

public interface LikeById {
    String getUserId();
    String getFirstName();
    String getLastName();
    long getCount();
}
