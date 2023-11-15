package com.socialnetwork.SocialNetWork.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
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
    private int postId ;
    
    public PostMedia() {

    }
    public PostMedia(int mediaId, int postId) {
        this.mediaId = mediaId;
        this.postId = postId;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setMediaId(int mediaId) {
        this.mediaId = mediaId;
    }

    public void setPostId(int postId) {
        this.postId = postId;
    }
}
