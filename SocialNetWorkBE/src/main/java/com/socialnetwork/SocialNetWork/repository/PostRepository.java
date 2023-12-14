package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Post;
import com.socialnetwork.SocialNetWork.model.IMPL.PostById;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value = "SELECT DISTINCT " +
            "p.id, " +
            "p.user_id AS userID, " +
            "p.content, " +
            "p.created_at AS createdAt, " +
            "p.delete_at AS deleteAt, " +
            "p.privacy_id AS privacyId, " +
            "u.first_name AS firstName, " +
            "u.last_name AS lastName, " +
            "u.image AS avatarUser " +
            "FROM posts AS p " +
            "LEFT JOIN  frindship AS f ON (p.user_id = f.sender_id OR p.user_id = f.receiver_id) " +
            "JOIN  user AS u ON p.user_id = u.id " +
            "WHERE ( (f.sender_id = ?1 " +
            "         OR f.receiver_id = ?1 OR f.sender_id IS NULL) " +
            "         AND f.status = 2 " +
            "         ) " +
            "      AND ( " +
            "         p.privacy_id = 1 OR " +
            "         (p.privacy_id = 2 AND p.user_id = ?1) OR " +
            "         (p.privacy_id = 3 AND EXISTS ( " +
            "             SELECT 1 " +
            "             FROM frindship AS f2 " +
            "             WHERE (f2.sender_id = ?1 " +
            "                    OR f2.receiver_id = ?1) " +
            "                    AND IFNULL(f2.status, 2) = 2 " +
            "                     AND (f2.sender_id = p.user_id OR f2.receiver_id = p.user_id) " +
            "                    )) " +
            "             ) " +
            "ORDER BY p.created_at DESC ", nativeQuery = true)
    List<PostById> getListPost(String userId);

    @Query(value = "SELECT DISTINCT " +
            "p.id, " +
            "p.user_id AS userID, " +
            "p.content, " +
            "p.created_at AS createdAt, " +
            "p.delete_at AS deleteAt, " +
            "p.privacy_id AS privacyId, " +
            "u.first_name AS firstName, " +
            "u.last_name AS lastName, " +
            "u.image AS avatarUser " +
            "FROM posts as p " +
            "JOIN user as u " +
            "ON p.user_id = u.id " +
            "WHERE p.user_id = ?1 " +
            "ORDER BY p.created_at DESC", nativeQuery = true)
    List<PostById> getListPostByUserId(String userId);

    // delete post by user
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM posts WHERE id = ?1 AND user_id = ?2", nativeQuery = true)
    void deletePostByUser(int postId, String userId);

    // update post
    @Modifying
    @Transactional
    @Query(value = "UPDATE posts AS p SET " +
            "p.content = COALESCE(?1, p.content), " +
            "p.created_at = COALESCE(?2, p.created_at), " +
            "p.privacy_id = COALESCE(?3, p.privacy_id) " +
            "WHERE p.id = ?4 AND p.user_id = ?5", nativeQuery = true)
    void updatePost(String content, Timestamp createdAt, int privacyId, int postId, String userId);

    // get content post by postId
    @Query(value = "SELECT content FROM posts WHERE id = ?1", nativeQuery = true)
    String getContentPostByPostId(int postId);

    // search by post
    @Query(value = "SELECT DISTINCT " +
            "p.id, " +
            "p.user_id AS userID,  " +
            "p.content, " +
            "p.created_at AS createdAt, " +
            "p.delete_at AS deleteAt, " +
            "p.privacy_id AS privacyId, " +
            "u.first_name AS firstName, " +
            "u.last_name AS lastName, " +
            "u.image AS avatarUser " +
            "FROM posts AS p " +
            "JOIN user AS u ON p.user_id = u.id " +
            "WHERE (p.privacy_id = 1 OR p.privacy_id = 3) AND (LOWER(p.content) LIKE CONCAT('%', LOWER(?1), '%')) " +
            "ORDER BY p.created_at DESC " +
            "LIMIT ?2", nativeQuery = true)
    List<PostById> searchByPost(String content, int limit);
}

