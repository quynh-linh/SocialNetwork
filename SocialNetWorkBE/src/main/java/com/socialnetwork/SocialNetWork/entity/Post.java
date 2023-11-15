package com.socialnetwork.SocialNetWork.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "posts")
public class Post {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private int id;

    @Column(name = "user_id",nullable = false)
    private String userId;

    @Column(name = "content",nullable = false)
    private String content;

    @Column(name = "created_at",nullable = false)
    private Timestamp createdAt;

    @Column(name = "delete_at")
    private Timestamp deleteAt;

    @Column(name = "privacy_id",nullable = false)
    private int privacyId;

    public Post(String userId, String content, Timestamp createdAt, Timestamp deleteAt, int privacyId) {
        this.userId = userId;
        this.content = content;
        this.createdAt = createdAt;
        this.deleteAt = deleteAt;
        this.privacyId = privacyId;
    }
    public Post() {
    }


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getDeleteAt() {
        return deleteAt;
    }

    public void setDeleteAt(Timestamp deleteAt) {
        this.deleteAt = deleteAt;
    }

    public int getPrivacyId() {
        return privacyId;
    }

    public void setPrivacyId(int privacyId) {
        this.privacyId = privacyId;
    }
}
