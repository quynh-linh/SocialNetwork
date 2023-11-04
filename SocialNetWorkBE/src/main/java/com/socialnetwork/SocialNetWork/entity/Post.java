package com.socialnetwork.SocialNetWork.entity;
import jakarta.persistence.*;
import org.hibernate.type.descriptor.DateTimeUtils;
@Entity
@Table(name = "post")
public class Post {
     @Id
     @Column(name = "id")
     private String id;



}
