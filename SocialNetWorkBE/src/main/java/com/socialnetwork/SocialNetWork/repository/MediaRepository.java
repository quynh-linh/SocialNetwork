package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;

public interface MediaRepository extends JpaRepository<Media,Long> {
    @Query(value = "SELECT * " +
            "FROM media AS m " +
            "WHERE m.user_id = ?1 AND m.media_type = 'images' " +
            "ORDER BY m.created_at DESC " +
            "LIMIT ?2 ",nativeQuery = true)
    List<Media> getListImageMedia(String id , int limit);

    @Query(value = "SELECT m.* " +
            "FROM post_media AS pm " +
            "JOIN media AS m ON pm.media_id = m.id " +
            "WHERE pm.post_id = ?1 ", nativeQuery = true)
    List<Media> getListMediaByPost(int postId);

    // delete post media by post
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM media WHERE id IN ?1", nativeQuery = true)
    void deleteMediaOfPost(List<String> mediaId);


    // update media
    @Modifying
    @Transactional
    @Query(value = "UPDATE media m SET " +
            "m.media_url = COALESCE(?2, m.media_url), " +
            "m.media_type = COALESCE(?3, m.media_type), " +
            "m.created_at = COALESCE(?4, m.created_at), " +
            "m.title = COALESCE(?5, m.title) " +
            "WHERE m.id = ?1", nativeQuery = true)
    void updateMedia(int id, String mediaUrl, String mediaType, Timestamp createdAt, String title);
}
