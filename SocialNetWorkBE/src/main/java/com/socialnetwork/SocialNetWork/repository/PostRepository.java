package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    // get list post display at home
    @Query(value = "SELECT p.* FROM posts AS p " +
            "CROSS JOIN frindship AS fr ON p.user_id = fr.sender_id " +
            "WHERE fr.status = 2 AND (p.privacy_id = 3 OR p.privacy_id = 1) " +
            "AND p.user_id = ?1", nativeQuery = true)
    List<Post> getListPost(String userId);

    // get list post display at profile
    @Query(value = "SELECT * FROM posts AS p WHERE p.user_id = ?1", nativeQuery = true)
    List<Post> getListPostOfUser(String userId);

    // delete post
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM posts WHERE id = ?1", nativeQuery = true)
    void deletePost(String postId);
}
