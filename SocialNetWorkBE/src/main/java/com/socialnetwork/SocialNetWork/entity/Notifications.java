package com.socialnetwork.SocialNetWork.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "notification")
public class Notifications {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "user_id", nullable = false)
    private String user_id;

    @Column(name = "name_user", nullable = false)
    private String nameUser;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "create_at", nullable = false)
    private Timestamp create_at;

    @Column(name = "post_id",nullable = true)
    private int post_id;

    @Column(name = "status", nullable = false)
    private int status;

    @Column(name = "image",nullable = false)
    private String image;

    public Notifications() {

    }

    public Notifications(String user_id, String nameUser, String content, Timestamp create_at, int post_id, int status, String image) {
        this.user_id = user_id;
        this.nameUser = nameUser;
        this.content = content;
        this.create_at = create_at;
        this.post_id = post_id;
        this.status = status;
        this.image = image;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUser_id() {
        return user_id;
    }

    public void setUser_id(String user_id) {
        this.user_id = user_id;
    }

    public String getNameUser() {
        return nameUser;
    }

    public void setNameUser(String nameUser) {
        this.nameUser = nameUser;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getCreate_at() {
        return create_at;
    }

    public void setCreate_at(Timestamp create_at) {
        this.create_at = create_at;
    }

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}

