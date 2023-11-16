package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PostRepository extends JpaRepository<Post,Long> {

    @Query(value = "SELECT p.* " +
            "FROM posts as p " +
            "CROSS JOIN frindship as fr ON p.user_id = fr.sender_id " +
            "WHERE fr.status = 2 AND p.user_id = ?1", nativeQuery = true)
    List<Post> getListPost(String userId);

}
