package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Frindship;
import com.socialnetwork.SocialNetWork.model.IMPL.CheckStatus;
import org.springframework.stereotype.Service;

@Service
public interface FrindshipService {
    public String addFrindship(Frindship frindship);

    public CheckStatus checkStatusFriends(String current, String other);
}
