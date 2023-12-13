package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Comments;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentById;
import com.socialnetwork.SocialNetWork.model.IMPL.CommentParentById;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
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


    @Query(value = "SELECT c.id AS commentId, c.parent_comment_id AS parentCommentId ,c.post_id AS postId , c.content , c.created_at AS createdAt  , c.user_id AS userId , u.first_name AS firstName , u.last_name AS lastName , u.image AS avatarUser " +
            "FROM comments as c " +
            "CROSS JOIN posts as p ON c.post_id = p.id AND c.parent_comment_id IS NOT NULL " +
            "CROSS JOIN user as u ON u.id = c.user_id " +
            "WHERE p.id = ?1 AND c.parent_comment_id = ?2 " +
            "ORDER BY c.created_at DESC " +
            "LIMIT ?3", nativeQuery = true)
    List<CommentParentById> getListParentCommentByPost(int postId, int commentId, int limit);

    // check comment child
    @Query(value = "SELECT COUNT(*) FROM comments WHERE parent_comment_id = ?1 ",nativeQuery = true)
    int checkCommentChild(String id);

    // delete comment
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM comments WHERE id = ?1", nativeQuery = true)
    void deleteComment(String id);

    // delete comment child
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM comments WHERE parent_comment_id = ?1", nativeQuery = true)
    void deleteCommentChild(String id);

    // update comment
    @Modifying
    @Transactional
    @Query(value = "UPDATE comments c SET c.content = ?1 WHERE c.id = ?2", nativeQuery = true)
    int updateComment(String content, int id);

    // get count comment parent by post
    @Query(value = "SELECT COUNT(*) FROM comments AS c WHERE c.post_id = ?1",nativeQuery = true)
    int getCountCommentParentByPost(String postId);

    // get count comment child by post
    @Query(value = "SELECT COUNT(*) FROM comments AS c WHERE c.post_id = ?1 AND c.parent_comment_id = ?2",nativeQuery = true)
    int getCountCommentChildByPost(String postId, String commentId);

    // check comment exits in post
    @Query(value = "SELECT COUNT(*) FROM comments AS c WHERE c.post_id = ?1", nativeQuery = true)
    int checkCommentExitsInPost(int postId);

    // delete all comment in post
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM comments WHERE post_id = ?1", nativeQuery = true)
    void deleteAllCommentParentInPost(int postId);

    // get id comment
    @Query(value = "SELECT id FROM comments WHERE post_id = ?1", nativeQuery = true)
    List<String> getListIdCommentByPost(int postId);

    // delete comment child In post
    @Modifying
    @Transactional
    @Query(value = "DELETE FROM comments WHERE parent_comment_id IN ?1", nativeQuery = true)
    void deleteAllCommentChildInPost(List<String> commentId);

    // get userId by parent_comment_id
    @Query(value = "SELECT user_id FROM comments WHERE parent_comment_id = ?1 ORDER BY created_at DESC LIMIT 1", nativeQuery = true)
    String getUserIdByParentComment(int parentCommentId);
}

