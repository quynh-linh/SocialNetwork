import { useState } from "react";
import { useDispatch} from "react-redux";
import { getListMediaByPost } from "~/redux/mediaSlice";
import { getListPost, getListPostByUserID } from "~/redux/postSlice";
function usePosts() {
    const dispatch = useDispatch();
    const [listPosts,setListPosts] = useState([]);
    const [listPostsByUserId,setListPostsByUserId] = useState([]);
    const handleGetListPost = async (userId) => {
        const listPost = await dispatch(getListPost({id : userId}))
        if(listPost && listPost.payload){
            const arrTempPost = listPost.payload;
            let arrMediaPost = [];
            let promises = [];
            if(arrTempPost.length > 0) {
                arrTempPost.forEach((postItem) => {
                    let promise = dispatch(getListMediaByPost({ id: postItem.id })).then((item) => {
                        if (item && item.payload && !item.payload.message) {
                            return { postId: postItem.id, media: item.payload };
                        }
                    });
                    promises.push(promise);
                });
                Promise.all(promises).then((results) => {
                    arrMediaPost = results.filter(item => item); 
                    arrMediaPost.forEach((mediaItem) => {
                        const postToUpdate = arrTempPost.find(post => post.id === mediaItem.postId);
                        if (postToUpdate) {
                            postToUpdate.media = mediaItem.media;
                        }
                    });
                    setListPosts(arrTempPost);
                });
            }
        }
    }
    const handleGetListPostByUserId = async (userId) => {
        const listPost = await dispatch(getListPostByUserID({id : userId}))
        if(listPost && listPost.payload){
            const arrTempPost = listPost.payload;
            let arrMediaPost = [];
            let promises = [];
            if(arrTempPost.length > 0) {
                arrTempPost.forEach((postItem) => {
                    let promise = dispatch(getListMediaByPost({ id: postItem.id })).then((item) => {
                        if (item && item.payload && !item.payload.message) {
                            return { postId: postItem.id, media: item.payload };
                        }
                    });
                    promises.push(promise);
                });
                Promise.all(promises).then((results) => {
                    arrMediaPost = results.filter(item => item); 
                    arrMediaPost.forEach((mediaItem) => {
                        const postToUpdate = arrTempPost.find(post => post.id === mediaItem.postId);
                        if (postToUpdate) {
                            postToUpdate.media = mediaItem.media;
                        }
                    });
                    setListPostsByUserId(arrTempPost);
                });
            }
        }
    }
    return {
        listPostsByUserId,
        listPosts,
        handleGetListPostByUserId,
        handleGetListPost
    };
}

export default usePosts;