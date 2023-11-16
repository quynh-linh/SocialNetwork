package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface MediaRepository extends JpaRepository<Media,Long> {
    @Query(value = "SELECT * " +
            "FROM media " +
            "WHERE user_id = ?1 AND media_type = 'image' " +
            "ORDER BY created_at DESC " +
            "LIMIT ?2",nativeQuery = true)
    List<Media> getListImageMedia(String id , int limit);

    @Query(value = "SELECT m.* FROM media as m " +
            "INNER JOIN post_media as pm ON m.id = pm.media_id " +
            "INNER JOIN posts as p ON pm.post_id = p.id " +
            "WHERE m.user_id = ?1", nativeQuery = true)
    List<Media> getListMediaByPost(String userId);

}
