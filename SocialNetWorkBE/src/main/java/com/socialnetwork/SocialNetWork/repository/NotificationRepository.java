package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Notifications;
import com.socialnetwork.SocialNetWork.model.IMPL.PostById;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notifications, Long> {

    // get notification by userId
    @Query(value = "SELECT * FROM notification WHERE user_id = ?1 ORDER BY create_at DESC LIMIT ?2", nativeQuery = true)
    List<Notifications> getNotification(String userId, int limit);

    // get detail post by notification
    @Query(value = "SELECT DISTINCT " +
            "p.id, " +
            "p.user_id AS userID," +
            "p.content," +
            "p.created_at AS createdAt, " +
            "p.delete_at AS deleteAt, " +
            "p.privacy_id AS privacyId, " +
            "u.first_name AS firstName, " +
            "u.last_name AS lastName, " +
            "u.image AS avatarUser " +
            "FROM notification as n " +
            "JOIN user as u " +
            "ON n.user_id = u.id " +
            "JOIN posts AS p " +
            "ON p.id = n.post_id " +
            "WHERE n.user_id = ?1 AND n.id = ?2", nativeQuery = true)
    PostById getDetailPostByNotification(String userId, int idNotification);

    // get count notification unread
    @Query(value = "SELECT COUNT(*) FROM notification WHERE user_id = ?1 AND status = 0",nativeQuery = true)
    int getCountNotificationUnread(String userId);

    // update status notification to readed
    @Modifying
    @Transactional
    @Query(value = "UPDATE notification SET status = 1 WHERE id = ?1", nativeQuery = true)
    void updateStatusNotificationReaded(int id);

    // check notification by post or other
    @Query(value = "SELECT post_id FROM notification WHERE id = ?1", nativeQuery = true)
    int checkNotificationByPostOrOther(int idNotification);

    // get user_id to notification id
    @Query(value = "SELECT user_id FROM notification WHERE id = ?1", nativeQuery = true)
    String getUserIdByNotificationId(int idNotification);

    // check notification readed or unread
    @Query(value = "SELECT status FROM notification WHERE id = ?1", nativeQuery = true)
    int checkNotificationReadedOrUnread(int idNotification);

}

