package com.socialnetwork.SocialNetWork.service;

import com.socialnetwork.SocialNetWork.entity.Notifications;
import com.socialnetwork.SocialNetWork.model.IMPL.PostById;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface NotificationService {

    public void addNotification(Notifications notifications);
    public List<Notifications> getNotification(String userId, int limit);
    public int getCountNotificationUnread(String userId);
    public boolean updateStatusNotificationReaded(int id);
    public  int checkNotificationByPostOrOther(int idNotification);
    public String getUserIdByNotificationId(int idNotification);
    public String checkNotificationReadedOrUnread(int idNotification);
    public PostById getDetailPostByNotification(String userId, int idNotification);
}

