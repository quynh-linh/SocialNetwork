import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import CreatePost from "~/components/form/CreatePost/CreatePost";
import Post from "~/components/Post/Post";
import CreatePostWrapper from "~/components/Popper/CreatePostWrapper";
import { useState } from "react";
function Home() {
    const cx = classNames.bind(styles);
    const [isShowCreatePost,setIsShowCreatePost] = useState(false);
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('bg-sidebar','wrapper__createPost')}>
                <CreatePost onShow={(e) => setIsShowCreatePost(e)}/>
            </div>
            <div className={cx('wrapper_listPost')}>
                <Post/>
            </div>
            {isShowCreatePost ? <CreatePostWrapper onShow={(e) => setIsShowCreatePost(e)}/> : ''}
        </div>
    );
}
export default Home;