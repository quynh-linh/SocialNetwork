package com.socialnetwork.SocialNetWork.repository;

import com.socialnetwork.SocialNetWork.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User,Long> {

    @Query(value = "select * from User u where u.email = ?1 and u.password = ?2", nativeQuery = true)
    User findUserByLogin(String email,String password);
}
