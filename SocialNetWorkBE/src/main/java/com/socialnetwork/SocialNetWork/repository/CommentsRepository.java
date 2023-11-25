package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentById;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comments, Long> {


    @Query(value = "SELECT c.id AS commentId, c.post_id AS postId , c.content , c.created_at AS createdAt  , c.user_id AS userId , u.first_name AS firstName , u.last_name AS lastName , u.image AS avatarUser " +
            "FROM comments as c " +
            "CROSS JOIN posts as p ON c.post_id = p.id AND c.parent_comment_id IS NULL " +
            "CROSS JOIN user as u ON c.user_id = u.id " +
            "WHERE p.id = ?1  " +
            "ORDER BY c.created_at DESC " +
            "LIMIT ?2 ", nativeQuery = true)
    List<CommentById> getListCommentByPost(int postId, int limit);


    @Query(value = "SELECT c.id AS commentId, c.post_id AS postId , c.content , c.created_at AS createdAt  , c.user_id AS userId , u.first_name AS firstName , u.last_name AS lastName , u.image AS avatarUser " +
            "FROM comments as c " +
            "CROSS JOIN posts as p ON c.post_id = p.id AND c.parent_comment_id IS NOT NULL " +
            "CROSS JOIN user as u ON u.id = c.user_id " +
            "WHERE p.id = ?1 AND c.parent_comment_id = ?2 " +
            "ORDER BY c.created_at DESC " +
            "LIMIT ?3", nativeQuery = true)
    List<CommentById> getListParentCommentByPost(int postId,int commentId,int limit);
}
