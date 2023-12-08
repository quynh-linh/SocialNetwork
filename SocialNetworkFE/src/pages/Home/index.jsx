import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import CreatePost from "~/components/form/CreatePost/CreatePost";
import Post from "~/components/Post/Post";
import CreatePostWrapper from "~/components/Popper/CreatePostWrapper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useUserToken from "~/hook/user";
import Loader from "~/components/loader/loader";
import BoxPostModal from "~/components/Popper/BoxPost";
import usePosts from "~/hook/post";
import CreateStories from "~/components/zuck/CreateStories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
function Home() {
    const cx = classNames.bind(styles);
    const [isShowCreatePost,setIsShowCreatePost] = useState(false);
    const [isShowBoxPost,setIsShowBoxPost] = useState({});
    const [valueMessageGetList,setValueMessageGetList] = useState('');
    const dispatch = useDispatch();
    const state = useSelector(state => state.post);
    const {valueIdUser , nameUrlImageUser} = useUserToken();
    const {handleGetListPost,listPosts} = usePosts();

    // HANDLE GET LIST POST
    useEffect(() => {
        if(valueIdUser !== undefined && !isShowCreatePost){
            handleGetListPost(valueIdUser);
        }
    },[valueIdUser,isShowCreatePost]);

    // SET VALUE MESSAGE
    useEffect(() => {
        if(state.msg === "No data"){
            setValueMessageGetList(state.msg);
        } else {
            setValueMessageGetList("");
        }
    },[state.msg]);

    return (
        <div className={cx('wrapper')}>
            <div className="flex items-center">
                <div className={cx('w-1/4','wrapper__createStories')}>
                    <img className="w-full h-4/5 object-cover" src={nameUrlImageUser} alt="user"/>
                    <div className="w-full h-1/5 relative">
                        <FontAwesomeIcon className={cx('wrapper__createStories-icon')} icon={faPlus}/>
                    </div>
                </div>
                <div  className="w-3/4 ml-5"><CreateStories/></div>
            </div>
            <div className="px-20">
                <div className={cx('bg-sidebar mt-10','wrapper__createPost')}>
                    <CreatePost onShow={(e) => setIsShowCreatePost(e)}/>
                </div>
                <div className={cx('wrapper__listPost')}>
                    {
                        valueMessageGetList === "No data" ?
                            <h1>Chưa có bài viết nào</h1>
                            : (listPosts.length > 0 ? listPosts.map((item) => {
                                return (
                                    <div key={item.id} className="mt-6">
                                        <Post 
                                            onShowBox={(e) => setIsShowBoxPost(e)}  
                                            data={item}
                                            obCloseBox={isShowBoxPost}
                                        />
                                    </div>
                                )
                            }) : <div className="mt-8"><Loader/></div>)
                    }
                </div>
            </div>
            {isShowCreatePost ? <CreatePostWrapper closeIsShow={(e) => setIsShowCreatePost(e)} isShow={isShowCreatePost} onShow={(e) => setIsShowCreatePost(e)}/> : ''}
            {/* SHOW BOX POST */}
            <BoxPostModal 
                closeIsShow={(e) => setIsShowBoxPost({...isShowBoxPost,isShow : e})}
                data={isShowBoxPost}
            />
        </div>
    );
}
export default Home;