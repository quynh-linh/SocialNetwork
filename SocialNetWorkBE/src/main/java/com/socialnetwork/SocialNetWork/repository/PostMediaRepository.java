package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Media;
import com.socialnetwork.SocialNetWork.entity.PostMedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostMediaRepository extends JpaRepository<PostMedia,Long> {

    // get mediaId by post
    @Query(value = "SELECT media_id FROM post_media WHERE post_id = ?1", nativeQuery = true)
    List<String> getListMediaIdByPost(int postId);

    // delete post media by post
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM post_media WHERE post_id = ?1", nativeQuery = true)
    void deletePostMediaByPost(int postId);
}
