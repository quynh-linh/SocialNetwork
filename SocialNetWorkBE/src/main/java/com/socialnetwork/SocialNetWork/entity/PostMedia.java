package com.socialnetwork.SocialNetWork.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "post_media")
public class PostMedia {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id",nullable = false)
    private int id;

    @Column(name = "media_id",nullable = false)
    private int mediaId;

    @Column(name = "post_id",nullable = false)
    private int post_id ;
    
    public PostMedia() {

    }
    public PostMedia(int mediaId, int post_id) {
        this.mediaId = mediaId;
        this.post_id = post_id;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getMediaId() {
        return mediaId;
    }

    public void setMediaId(int mediaId) {
        this.mediaId = mediaId;
    }

    public int getPost_id() {
        return post_id;
    }

    public void setPost_id(int post_id) {
        this.post_id = post_id;
    }
}
