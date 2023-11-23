import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import CreatePost from "~/components/form/CreatePost/CreatePost";
import Post from "~/components/Post/Post";
import CreatePostWrapper from "~/components/Popper/CreatePostWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserToken from "~/hook/user";
import { getListPost } from "~/redux/postSlice";
import { getListMediaByPost } from "~/redux/mediaSlice";
import { list } from "firebase/storage";
function Home() {
    const cx = classNames.bind(styles);
    const [isShowCreatePost,setIsShowCreatePost] = useState(false);
    const [listPostsMedia,setListPostsMedia] = useState([]);
    const [listPosts,setListPosts] = useState([]);
    const dispatch = useDispatch();
    const {valueIdUser} = useUserToken();

    const handleGetListPost = async (userId) => {
        const listPost = await dispatch(getListPost({id : userId}))
        if(listPost && listPost.payload){
            const arrTempPost = listPost.payload;
            let arrMediaPost = [];
            let promises = [];
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
    useEffect(() => {
        if(valueIdUser !== undefined){
            handleGetListPost(valueIdUser);
        }
    },[valueIdUser]);
    useEffect(() =>{
        console.log(listPosts);
    },[listPostsMedia,listPosts])
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('bg-sidebar','wrapper__createPost')}>
                <CreatePost onShow={(e) => setIsShowCreatePost(e)}/>
            </div>
            <div className={cx('wrapper_listPost')}>
                {
                    listPosts && listPosts.map((item) => <Post key={item.id} data={item}/>)
                }
            </div>
            {isShowCreatePost ? <CreatePostWrapper onShow={(e) => setIsShowCreatePost(e)}/> : ''}
        </div>
    );
}
export default Home;