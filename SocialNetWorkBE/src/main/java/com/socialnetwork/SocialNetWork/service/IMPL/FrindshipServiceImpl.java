package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Frindship;
import com.socialnetwork.SocialNetWork.model.IMPL.CheckStatus;
import com.socialnetwork.SocialNetWork.repository.FrindshipRepository;
import com.socialnetwork.SocialNetWork.service.FrindshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

@Component
public class FrindshipServiceImpl implements FrindshipService {

    private final FrindshipRepository frindshipRepository;

    @Autowired
    public FrindshipServiceImpl(FrindshipRepository frindshipRepository){ this.frindshipRepository = frindshipRepository;}
    @Override
    public String addFrindship(Frindship frindship) {
        if(!frindship.getSenderId().isEmpty() && !frindship.getReceiverId().isEmpty()){
            frindshipRepository.save(frindship);
            return "success";
        }
        return "error";
    }

    @Override
    public CheckStatus checkStatusFriends(String current, String other) {
        try {
            if(!current.isEmpty() && !other.isEmpty()) {
                return frindshipRepository.checkStatusFriends(current,other);
            }
        } catch (DataAccessException ex){
            ex.printStackTrace();
            return null;
        }
        return null;
    }
}
