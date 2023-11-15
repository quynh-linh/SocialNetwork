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
}
