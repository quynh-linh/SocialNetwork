package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {
    @Query(value = "select * from User u where u.email = ?1", nativeQuery = true)
    User findUserByEmail(String email);
    @Query(value = "select * from User u where u.email = ?1 and u.password = ?2", nativeQuery = true)
    User findUserByLogin(String email,String password);
    @Modifying
    @Transactional
    @Query(value = "UPDATE User u SET u.email = ?1 , u.first_name = ?2 , u.last_name = ?3 , u.date_of_birth = ?4 , u.address = ?5 WHERE u.id = ?6", nativeQuery = true)
    int updateUser(String email,String firstName,String lastName,String dateOfBirth , String address , String id);
}