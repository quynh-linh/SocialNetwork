package com.socialnetwork.SocialNetWork.controller;

import com.socialnetwork.SocialNetWork.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api/v1/post")
@RestController
public class PostController {
    @Autowired
    public PostService postService;
}
