package com.socialnetwork.SocialNetWork.model.Response;

import com.socialnetwork.SocialNetWork.model.IMPL.LikeById;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class GetLikeResponse {
    private List<LikeById> likeByIds;
    private String message;
    private long total;

    public GetLikeResponse(List<LikeById> data, String message,long total) {
        this.likeByIds = data;
        this.message = message;
        this.total = total;
    }
}
