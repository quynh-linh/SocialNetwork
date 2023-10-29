package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.User;
import com.socialnetwork.SocialNetWork.model.IMPL.RequestUserFriends;
import com.socialnetwork.SocialNetWork.model.IMPL.UserFriendshipStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    // GET TOKEN BY EMAIL USER
    @Query(value = "select * from User u where u.email = ?1", nativeQuery = true)
    User findUserByEmail(String email);

    // LOGIN USER
    @Query(value = "select * from User u where u.email = ?1 and u.password = ?2", nativeQuery = true)
    User findUserByLogin(String email,String password);

    // UPDATE USER
    @Modifying
    @Transactional
    @Query(value = "UPDATE User u SET u.email = ?1 , u.first_name = ?2 , u.last_name = ?3 , u.date_of_birth = ?4 , u.address = ?5 WHERE u.id = ?6", nativeQuery = true)
    int updateUser(String email,String firstName,String lastName,String dateOfBirth , String address , String id);

    // UPDATE IMAGE USER
    @Modifying
    @Transactional
    @Query(value = "UPDATE User u SET u.image = ?1 WHERE u.id = ?2", nativeQuery = true)
    int updateImageUser(String image , String id);

    @Modifying
    @Transactional
    @Query(value = "UPDATE frindship AS fr \n " +
            "SET status= ?1 \n " +
            "WHERE \n" +
            "fr.sender_id = ?2 \n" +
            "AND \n" +
            "fr.receiver_id = ?3 ",nativeQuery = true)
    int updateStatusByFriends(int status,String senderId , String receiverId);
    @Query(value = "SELECT u.id , u.first_name , u.last_name , u.image , fr.receiver_id , fr.status , fr.created_at \n" +
            "FROM `user` as u \n" +
            "CROSS JOIN frindship as fr \n" +
            "ON u.id = fr.receiver_id \n" +
            "WHERE fr.sender_id =?1 AND fr.status = 1 \n" +
            "ORDER BY fr.created_at \n" +
            "LIMIT ?2", nativeQuery = true)
    List<RequestUserFriends> getUserRequestFriends(String id,int limit);

    @Query(value = "SELECT u.* , fr.status \n" +
            "FROM user as u \n" +
            "LEFT JOIN frindship as fr \n" +
            "ON u.id = fr.receiver_id \n" +
            "WHERE (fr.status IS NULL OR fr.status = 3) AND u.id != ?1",nativeQuery = true)
    List<UserFriendshipStatus> getListSuggestedFriends(String id);
}