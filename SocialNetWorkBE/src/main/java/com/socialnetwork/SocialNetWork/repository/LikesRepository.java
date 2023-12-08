package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Likes;
import com.socialnetwork.SocialNetWork.model.IMPL.LikeById;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    // check user liked
    @Query(value = "SELECT COUNT(*) FROM likes AS l WHERE l.user_id = ?1 AND post_id = ?2", nativeQuery = true)
    int checkUserLiked(String userId,int postId);

    // delete like by user
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM likes WHERE user_id = ?1 AND post_id = ?2 ", nativeQuery = true)
    void deleteLikeByUser(String userId,int postId);

    // get count like by post
    @Query(value = "SELECT " +
            "    l.user_id AS userId, " +
            "    u.first_name AS firstName, " +
            "    u.last_name AS lastName, " +
            "    COUNT(*) AS count " +
            "FROM " +
            "    likes AS l " +
            "LEFT JOIN " +
            "    user AS u ON l.user_id = u.id " +
            "WHERE " +
            "    l.post_id = ?1 " +
            "GROUP BY" +
            "    l.user_id, u.first_name,u.last_name ", nativeQuery = true)
    List<LikeById> getCountLikeByPost(String postId);

    // delete all like in post
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM likes WHERE post_id = ?1", nativeQuery = true)
    void deleteLikesInPost(int postId);

    // check like exits in post
    @Query(value = "SELECT COUNT(*) FROM likes WHERE post_id = ?1", nativeQuery = true)
    int checkLikesExitInPost(int postId);

}

