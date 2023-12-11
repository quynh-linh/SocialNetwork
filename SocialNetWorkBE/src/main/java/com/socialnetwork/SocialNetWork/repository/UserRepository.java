package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.User;
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
    @Query(value = "UPDATE frindship AS fr " +
            "SET status= ?1 , update_at= ?2 , delected_at= ?3 " +
            "WHERE " +
            "fr.sender_id = ?4 " +
            "AND " +
            "fr.receiver_id = ?5 ",nativeQuery = true)
    int updateStatusByFriends(int status,String updateAt , String delectedAt,String senderId , String receiverID);
    @Query(value = "SELECT DISTINCT u.* " +
            "FROM `user` as u " +
            "CROSS JOIN frindship as fr " +
            "ON u.id = fr.receiver_id " +
            "WHERE fr.sender_id = ?1 AND fr.status = 1 " +
            "ORDER BY fr.created_at DESC " +
            "LIMIT ?2", nativeQuery = true)
    List<User> getUserRequestFriends(String id,int limit);

    @Query(value = "SELECT DISTINCT u.* " +
            "FROM user AS u " +
            "LEFT JOIN frindship AS f1 ON u.id = f1.receiver_id AND f1.sender_id = ?1 AND f1.status = 1 " +
            "LEFT JOIN frindship AS f2 ON u.id = f2.sender_id AND f2.receiver_id = ?1 AND f2.status = 1 " +
            "LEFT JOIN frindship AS f3 ON u.id = f3.receiver_id AND f3.sender_id = ?1 AND f3.status = 2 " +
            "LEFT JOIN frindship AS f4 ON u.id = f4.sender_id AND f4.receiver_id = ?1 AND f4.status = 2 " +
            "WHERE u.id != ?1 " +
            "AND f1.receiver_id IS NULL " +
            "AND f2.sender_id IS NULL " +
            "AND f3.receiver_id IS NULL " +
            "AND f4.sender_id IS NULL " +
            "LIMIT ?2 ", nativeQuery = true)
    List<User> getListSuggestedFriends(String id, int limit);

    @Query(value = "SELECT DISTINCT u.* FROM user as u " +
            "WHERE u.id IN (SELECT f.sender_id FROM frindship as f WHERE f.receiver_id = ?1 AND f.status = 1 " +
            "ORDER BY f.created_at DESC) " +
            "LIMIT ?2", nativeQuery = true)
    List<User> getListUserVerifyRequest(String id, int limit);

    @Query(value = "SELECT DISTINCT u.* " +
            "FROM user AS u " +
            "JOIN frindship AS f ON (u.id = f.sender_id OR u.id = f.receiver_id) " +
            "WHERE (f.sender_id = ?1 OR f.receiver_id = ?1) " +
            "AND u.id != ?1 " +
            "AND f.status = 2 " +
            "LIMIT ?2 ",nativeQuery = true)
    List<User> getListUserFriends(String id ,int limit);

    @Query(value = "SELECT u.* " +
            "FROM user AS u " +
            "WHERE u.id = ?1 ",nativeQuery = true)
    User getDetailUserById(String id);

    @Query(value = "SELECT DISTINCT * FROM user " +
            "WHERE first_name LIKE %?1% OR last_name LIKE %?1%", nativeQuery = true)
    List<User> getListUserBySearch(String name);

}