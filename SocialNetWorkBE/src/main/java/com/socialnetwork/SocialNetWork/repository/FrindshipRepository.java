package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.Frindship;
import com.socialnetwork.SocialNetWork.model.IMPL.CheckStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FrindshipRepository extends JpaRepository<Frindship,Long> {
    @Query(value = "SELECT " +
            "CASE " +
            "   WHEN f.status = 2 THEN 'Bạn bè' " +
            "   WHEN f.status = 1 THEN 'Đã gửi yêu cầu kết bạn' " +
            "   ELSE 'Không phải bạn bè' " +
            "END AS FriendshipStatus " +
            "FROM frindship f " +
            "WHERE " +
            "  ((f.sender_id = ?1 AND f.receiver_id = ?2) " +
            "   OR  " +
            "    (f.sender_id = ?2 AND f.receiver_id = ?1))  " +
            "   AND f.status IN (1, 2) ",nativeQuery = true)
    CheckStatus checkStatusFriends(String current , String other);
}
