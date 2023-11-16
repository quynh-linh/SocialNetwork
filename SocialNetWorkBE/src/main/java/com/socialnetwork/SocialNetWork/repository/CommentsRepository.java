package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Comments;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {


    @Query(value = "SELECT c.* FROM comments as c CROSS JOIN posts as p ON c.post_id = p.id AND c.parent_comment_id IS NULL WHERE p.id = ?1  LIMIT 10", nativeQuery = true)
    List<Comments> getListCommentByPost(int postId);


    @Query(value = "SELECT c.* FROM comments as c CROSS JOIN posts as p ON c.post_id = p.id AND c.parent_comment_id IS NOT NULL WHERE p.id = ?1 LIMIT 5", nativeQuery = true)
    List<Comments> getListParentCommentByPost(int postId);
}
