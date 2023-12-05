package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Likes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

public interface LikesRepository extends JpaRepository<Likes, Long> {

    // check user liked
    @Query(value = "SELECT COUNT(*) FROM likes AS l WHERE l.user_id = ?1", nativeQuery = true)
    int checkUserLiked(String userId);

    // delete like by user
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM likes WHERE user_id = ?1", nativeQuery = true)
    void deleteLikeByUser(String userId);

    // get count like by post
    @Query(value = "SELECT COUNT(*) FROM likes AS l WHERE l.post_id = ?1", nativeQuery = true)
    int getCountLikeByPost(String postId);

}

