package com.socialnetwork.SocialNetWork.entity;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "frindship")
public class Frindship {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sender_id",nullable = false)
    private String senderId;

    @Column(name = "receiver_id",nullable = false)
    private String receiverId;

    @Column(name = "created_at",nullable = false)
    private Timestamp createdAt;

    @Column(name = "update_at")
    private Timestamp updateAt;

    @Column(name = "delected_at")
    private Timestamp delectedAt;

    @Column(name = "status ",nullable = false)
    private int status;

    public Frindship() {
    }

    public Frindship(Long id, String senderId, String receiverId, Timestamp createdAt, Timestamp updateAt, Timestamp delectedAt, int status) {
        this.id = id;
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.delectedAt = delectedAt;
        this.status = status;
    }

    public Frindship(String senderId, String receiverId, Timestamp createdAt, Timestamp updateAt, Timestamp delectedAt, int status) {
        this.senderId = senderId;
        this.receiverId = receiverId;
        this.createdAt = createdAt;
        this.updateAt = updateAt;
        this.delectedAt = delectedAt;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSenderId() {
        return senderId;
    }

    public void setSenderId(String senderId) {
        this.senderId = senderId;
    }

    public String getReceiverId() {
        return receiverId;
    }

    public void setReceiverId(String receiverId) {
        this.receiverId = receiverId;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public Timestamp getUpdateAt() {
        return updateAt;
    }

    public void setUpdateAt(Timestamp updateAt) {
        this.updateAt = updateAt;
    }

    public Timestamp getDelectedAt() {
        return delectedAt;
    }

    public void setDelectedAt(Timestamp delectedAt) {
        this.delectedAt = delectedAt;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
