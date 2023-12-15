import classNames from "classnames/bind";
import styles from "./PostsSearch.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { searchByPost } from "~/redux/postSlice";
import Loader from "~/components/loader/loader";
import Post from "~/components/Post/Post";
import BoxPostModal from "~/components/Popper/BoxPost";
function PostsSearch() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [listPostsSearch,setListPostsSearch] = useState([]);
    const [isShowBoxPost,setIsShowBoxPost] = useState({});
    const [valueMessageSearch,setValueMessageSearch] = useState('');
    //
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q');
    const statePost = useSelector(state => state.post);

    useEffect(() => {
        if(query !== ''){
            dispatch(searchByPost({content: query, limit: 100}));
        }
    },[query]);


    useEffect(() => {
        if(statePost.arrSearchPost !== null){
            console.log(statePost.arrSearchPost)
            setListPostsSearch(statePost.arrSearchPost);
        }
    },[statePost]);

    useEffect(() => {
        if(statePost.msg){
            setValueMessageSearch(statePost.msg);
        }
    },[statePost]);

    return (  
        <div className={cx('wrapper','h-full overflow-y-auto')}>
            <div className="flex items-center justify-center ">
                <div className={cx("py-20 px-36 mb-20 w-full", valueMessageSearch === "data is null !" ? 'text-center' : '')}>
                    {
                        valueMessageSearch === "data is null !" ? (
                            <h1 className="text-color-text font-bold text-3xl">Không tìm thấy kết quả phù hợp</h1>
                        )
                        : (listPostsSearch.length > 0 ? listPostsSearch.map((item) => {
                            return (
                                <div key={item.id} className="mt-6 w-full">
                                    <Post
                                        onShowBox={(e) => setIsShowBoxPost(e)}
                                        data={item}
                                        obCloseBox={isShowBoxPost}
                                    />
                                </div>
                            )
                        }) : <div className="mt-8"><Loader/></div>)
                    }
                    {
                        listPostsSearch.length > 0 && (
                            <div className="text-center text-color-text font-semibold text-xl mt-8">
                                <h1>Kết quả tìm kiếm chỉ bao gồm những nội dung hiển thị với bạn.</h1>
                                <h3 className="underline">Tìm hiểu thêm</h3>
                            </div>
                        )
                    }
                </div>
                {/* SHOW BOX POST */}
                <BoxPostModal 
                    closeIsShow={(e) => setIsShowBoxPost({...isShowBoxPost,isShow : e})}
                    data={isShowBoxPost}
                />
            </div>
        </div>
    );
}

export default PostsSearch;