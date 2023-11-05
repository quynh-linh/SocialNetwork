package com.socialnetwork.SocialNetWork.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "media")
public class Media {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private int id;

    @Column(name = "user_id",nullable = false)
    private String userId;

    @Column(name = "media_url",nullable = false)
    private String mediaUrl;

    @Column(name = "media_type",nullable = false)
    private String mediaType;

    @Column(name = "created_at",nullable = false)
    private Timestamp createdAt;

    @Column(name = "title",nullable = false)
    private String title;

    @Column(name = "description")
    private String description;

    public Media(){

    }
    public Media (int id, String userId, String mediaUrl, String mediaType, Timestamp createdAt, String title, String description) {
        this.id = id;
        this.userId = userId;
        this.mediaUrl = mediaUrl;
        this.mediaType = mediaType;
        this.createdAt = createdAt;
        this.title = title;
        this.description = description;
    }

    public Media(String userId, String mediaUrl, String mediaType, Timestamp createdAt, String title, String description) {
        this.userId = userId;
        this.mediaUrl = mediaUrl;
        this.mediaType = mediaType;
        this.createdAt = createdAt;
        this.title = title;
        this.description = description;
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

    public String getMediaUrl() {
        return mediaUrl;
    }

    public void setMediaUrl(String mediaUrl) {
        this.mediaUrl = mediaUrl;
    }

    public String getMediaType() {
        return mediaType;
    }

    public void setMediaType(String mediaType) {
        this.mediaType = mediaType;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
