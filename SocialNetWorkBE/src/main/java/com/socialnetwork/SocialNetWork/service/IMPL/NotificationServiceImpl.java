package com.socialnetwork.SocialNetWork.service.IMPL;

import com.socialnetwork.SocialNetWork.entity.Notifications;
import com.socialnetwork.SocialNetWork.model.IMPL.PostById;
import com.socialnetwork.SocialNetWork.repository.NotificationRepository;
import com.socialnetwork.SocialNetWork.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }

    // add notification
    @Override
    public void addNotification(Notifications notifications){
        try{
            if(!notifications.getContent().isEmpty() && !notifications.getUser_id().isEmpty()){
                notificationRepository.save(notifications);
            }
        }catch (DataAccessException e){
            e.printStackTrace();
        }
    }

    // get notification
    @Override
    public List<Notifications> getNotification(String userId, int limit){
        try{
            if (!userId.isEmpty() && limit > 0){
                ArrayList<Notifications> notifications = (ArrayList<Notifications>) notificationRepository.getNotification(userId,limit);
                if (notifications != null){
                    return notifications;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

    // get Count Notification Unread
    @Override
    public int getCountNotificationUnread(String userId){
        try {
            if (!userId.isEmpty()){
                int count = notificationRepository.getCountNotificationUnread(userId);
                if (count > 0){
                    return count;
                }
            }
            return 0;
        }catch (DataAccessException e){
            e.printStackTrace();
            return 0;
        }
    }

    // update Status Notification Readed
    @Override
    public boolean updateStatusNotificationReaded(int id){
        try {
            if (id > 0){
                notificationRepository.updateStatusNotificationReaded(id);
                return true;
            }
        }catch (DataAccessException e){
            e.printStackTrace();
        }
        return false;
    }

    // check Notification By Post Or Other
    @Override
    public  int checkNotificationByPostOrOther(int idNotification){
        try {
            if (idNotification > 0){
                int post_id = notificationRepository.checkNotificationByPostOrOther(idNotification);
                if (post_id > 0){
                    return post_id;
                }
            }
            return 0;
        }catch (DataAccessException e){
            e.printStackTrace();
            return 0;
        }
    }

    // get User Id By Notification Id
    @Override
    public String getUserIdByNotificationId(int idNotification){
        try {
            if (idNotification > 0){
                String user_id = notificationRepository.getUserIdByNotificationId(idNotification);
                if (!user_id.isEmpty()){
                    return user_id;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

    // check Notification Readed Or Unread
    @Override
    public String checkNotificationReadedOrUnread(int idNotification){
        try {
            if (idNotification > 0){
                int check = notificationRepository.checkNotificationReadedOrUnread(idNotification);
                if (check == 0){
                    return "unRead";
                }
            }
            return "reaDed";
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

    // get post detail from notification
    @Override
    public PostById getDetailPostByNotification(String userId, int idNotification){
        try {
            if (idNotification > 0 && !userId.isEmpty()){
                PostById postById = notificationRepository.getDetailPostByNotification(userId,idNotification);
                if (postById != null){
                   return postById;
                }
            }
            return null;
        }catch (DataAccessException e){
            e.printStackTrace();
            return null;
        }
    }

}

