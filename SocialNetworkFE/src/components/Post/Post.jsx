import classNames from "classnames/bind";
import styles from "./Post.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faComment, faEarthAmericas, faEllipsisVertical, faShare, faThumbsUp, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import Comment from "../form/Comment/Comment";
import calculateTime from "~/const/calculateTime";
import ShowComment from "../form/Comment/components/ShowComment";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getListCommentByPost } from "~/redux/commentSlice";
function Post({data,onShowBox=undefined,isShowBox = false, message = ''}) {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [valueFirstComment,setValueFirstComment] = useState([]);
    const [valueMessageAddComments,setValueMessageAddComments] = useState('');
    

    // HANDLE GET LIST COMMENTS
    const handleGetListComments = async (id) => {
        return await dispatch(getListCommentByPost({
            id: id,
            limit: 100
        })).then((item) => {
            const ob = item && item.payload && !item.payload.message ? item.payload : null;
            setValueFirstComment(ob);
        })
    }

    // HANDLE CLICK SHOW BOX POST
    const handleClickShowBoxPost = () => {
        if(!isShowBox){
            onShowBox({
                ...data,
                isShow: true
            });
        }
    };

    // HANDLE GET LIST COMMENTS
    useEffect(() => {
        if(data && data.id){
            handleGetListComments(data.id);
        }
    },[]);

    // RENDER GET LIST COMMENTS AGAIN WHEN MESSAGE === SUCCESS
    useEffect(() => {
        if(valueMessageAddComments === "success" || message === "success"){
            handleGetListComments(data.id);
        }
    },[valueMessageAddComments,message]);

    return (
        <div className={cx('wrapper','bg-sidebar')}>
            <div className={cx('wrapper__header')}>
                <div className={cx('wrapper__header-info','flex items-center justify-between p-5')}>
                    <div className={cx('flex')}>
                        <img className={cx('wrapper__header-info-img','w-20 h-20')}  src={data && data.avatarUser ? data.avatarUser : images.user} alt="POST USER"/>
                        <div className={cx('text-white pl-5')}>
                            <div className={cx('flex items-center')}>
                                <span className={cx('wrapper__header-info-name','')}>{data && data.firstName && data.lastName ? data.firstName  + " " + data.lastName : ""}</span>
                                <FontAwesomeIcon className={cx('wrapper__header-info-icon','w-3 h-3')} icon={faCircleDot}/>
                                <span className={cx('wrapper__header-info-timePost','')}>{data && data.createdAt ? calculateTime(data.createdAt) : ""}</span>
                            </div>
                            <div className={cx('wrapper__header-info-jobAt','flex items-center mt-3')}>
                                <div className="text-lg">Web Developer at Tp.Ho Chi Minh</div>
                                {
                                    data && data.privacyId == 1 && (
                                        <div className={cx("flex items-center ml-3 text-lg",'wrapper__header-info-jobAt-box')}>
                                            <span>Công khai</span>
                                            <FontAwesomeIcon className="ml-3" icon={faEarthAmericas}/>
                                        </div>
                                    )
                                }
                                {
                                    data && data.privacyId === 3 && (
                                        <div className={cx("flex items-center ml-3 text-lg",'wrapper__header-info-jobAt-box')}>
                                            <span>Bạn bè</span>
                                            <FontAwesomeIcon className="ml-3" icon={faUserGroup}/>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={cx('text-white')}>
                        <FontAwesomeIcon icon={faEllipsisVertical}/>
                    </div>
                </div> 
                <div className={cx('wrapper__content')}>
                    <div className={cx('wrapper__content-des','p-5')}>
                        {data && data.content ? data.content : ""}
                    </div>
                    {
                        data && data.media ? (
                            <div className={cx('wrapper__content-imgPost',data.media.length === 1 ? 'grid-cols-1' : 'grid gap-4 grid-cols-2')}>
                                {
                                    data.media.map((item,index) => {
                                        if(item.mediaType === "videos"){
                                            return <video key={index} className={cx("w-full h-auto shadow-bsd-bottom")} controls src={item.mediaUrl} />
                                        } else {
                                            return <img className={cx(data.media.length === 1 ? 'w-auto' : 'w-full',"object-cover shadow-bsd-bottom")} key={index} src={item.mediaUrl} alt={item.mediaUrl}/>
                                        }
                                    })
                                }   
                                
                            </div>
                        ) : ""
                    }
                    <div className={cx('wrapper__content-interactWith','text-white flex items-center justify-between px-10 py-5')}>
                        <div className={cx('flex items-center')}>
                            <div className={cx('wrapper__content-interactWith-Likes','text-primaryColor flex items-center')}>
                                <FontAwesomeIcon icon={faThumbsUp}/>        
                                <span className="pl-3">Thích</span>
                                <span className={cx('wrapper__content-interactWith-Likes-quantity','')}>(103)</span>
                            </div>
                            <div 
                                className={cx('wrapper__content-interactWith-Comments','flex items-center')}
                                onClick={handleClickShowBoxPost}
                            >
                                <FontAwesomeIcon icon={faComment}/>
                                <span className="pl-3">Bình luận</span>
                                <span  className={cx('wrapper__content-interactWith-Comments-quantity','')}>(103)</span>
                            </div>
                        </div>
                        <div className={cx('wrapper__content-interactWith-Share','flex items-center')}>
                            <FontAwesomeIcon icon={faShare}/>
                            <span className="pl-3">Chia sẻ</span>
                            <span  className={cx('wrapper__content-interactWith-Share-quantity','')}>(103)</span>
                        </div>
                    </div>
                    { 
                        !isShowBox && valueFirstComment !== null && valueFirstComment.length >= 2 ? (
                        <div className={cx('wrapper__content-seeAll','text-start ml-5 mt-4 text-xl font-semibold hover:underline cursor-pointer ')}>
                            Xem tất cả bình luận
                        </div>) : ''
                    }
                    {/* REPLY COMMENTS */}
                    {
                        !isShowBox ? (
                            valueFirstComment !== null ? (
                                <div className="p-5">
                                    <ShowComment type="first" data={valueFirstComment[0]}/>
                                </div>
                            ) : ''
                        ) : (
                            <div className="p-5">
                                {
                                    Array.isArray(valueFirstComment) && valueFirstComment.map((item,index) => <ShowComment isShowBox={isShowBox} key={index} type="first" data={item}/>)
                                }
                            </div>
                        )
                    }
                    {
                        isShowBox ? '' : (
                            <div className={cx('wrapper__content-addComment','p-5')}>
                                <Comment type="father" data={data} setMessage={(e) => setValueMessageAddComments(e)}/>
                            </div>
                        )   
                    }
                </div>
            </div>
            
        </div>
    );
}

export default Post;