import classNames from "classnames/bind";
import styles from "./ShowComment.module.scss";
import images from "~/assets/images";
import { useEffect, useState } from "react";
import Comment from "../../Comment";
import calculateTime from "~/const/calculateTime";
import { useDispatch, useSelector } from "react-redux";
import { getListParentCommentById } from "~/redux/commentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown } from "@fortawesome/free-solid-svg-icons";
function TextComment({data,onShowReply}) {
    const cx = classNames.bind(styles)
    return (
        <div >
            <div className={cx('flex items-center')}>
                <div className={cx('wrapper__img')}>
                    <img src={data && data.avatarUser ? data.avatarUser : images.user} className={cx('wrapper__img-imgUser','w-16 h-16')} alt="COMMENTS USER"/>
                </div>
                <div className={cx('wrapper__showComment-width')}>
                    <div className={cx('wrapper__showComment-content','bg-comment flex justify-between')}>
                        <div>
                            <div className={cx('wrapper__showComment-content-title','text-white font-semibold text-2xl')}>
                                {data && data.firstName && data.lastName ? data.firstName + " " + data.lastName : ''}
                            </div>
                            <div className={cx('wrapper__showComment-content-des','mt-3')}>{data && data.content ? data.content : ''}</div>
                        </div>
                        <div className={cx('wrapper__showComment-content-timeAt','')}>{data && data.createdAt ? calculateTime(data.createdAt) : '0s'}</div>
                    </div>
                    <MenuComment onClickReply={(e) => onShowReply(e)}/>
                </div>
            </div> 
        </div>
    )
}
function MenuComment({onClickReply}) {
    const cx = classNames.bind(styles);
    const handleReplyComment = () => {
        onClickReply(true);
    };
    return (
        <ul className={cx('flex items-center','wrapper__showComment-menu')}>
            <li>
                <span>Thích</span>
                <span>(3)</span>
            </li>
            <li className={cx('pl-10')} onClick={handleReplyComment}>
                <span>Phản hồi</span>
            </li>
        </ul>
    )
}
function ShowComment({data,type=""}) {
    const cx = classNames.bind(styles)
    const [isShowReplyCommentParentLevel1,setShowReplyCommentParentLevel1] = useState(false);
    const [isShowReplyCommentParentLevel2,setShowReplyCommentParentLevel2] = useState(false);
    const [valueMessageAddComments,setValueMessageAddComments] = useState('');
    const [valueFirstParentComment,setValueFirstParentComment] = useState([]);
    const dispatch = useDispatch();

    const handleGetListParentCommentById = async (postId,commentID) => {
        return await dispatch(getListParentCommentById({
            id: postId,
            limit: 100,
            commentId: commentID
        })).then((item) => {
            const ob = item && item.payload && !item.payload.message ? item.payload : null;
            setValueFirstParentComment(ob);
        });
    }
    
    useEffect(() => {
        if(data && data.postId && data.commentId){
            handleGetListParentCommentById(data.postId,data.commentId)
        }
    },[data]);

    useEffect(() => {
        if(valueMessageAddComments === "success"){
            handleGetListParentCommentById(data.postId,data.commentId)
        }
    },[valueMessageAddComments])
    return (  
        <div className={cx('wrapper__showComment')}>
            <TextComment data={data} onShowReply={(e) => setShowReplyCommentParentLevel1(e)}/> 
            <div className={cx('wrapper__showComment-menu','mt-4 ml-24')}>
                <div className={cx('wrapper__showComment-listReplyCommentParent',)}>
                    <div className="mt-4">
                        {
                            valueFirstParentComment !== null && valueFirstParentComment.length > 0 ? (
                                <TextComment 
                                    data={valueFirstParentComment[0]}
                                    onShowReply={(e) => setShowReplyCommentParentLevel2(e)}
                                />
                            ) : ''
                        }
                        {
                            valueFirstParentComment !== null && (
                                <div className="mt-4">
                                    <div className="ml-20 mt-5">
                                        {
                                            isShowReplyCommentParentLevel2 ? <Comment/> : ""
                                        }
                                    </div>
                                </div>
                            )   
                        }
                        {
                            valueFirstParentComment !== null &&  valueFirstParentComment.length >= 2 ? (
                                <div className="ml-20 mt-4 flex items-center font-semibold ">
                                    <FontAwesomeIcon icon={faArrowTurnDown}/>
                                    <div className="ml-4 hover:underline cursor-pointer">Xem tất cả phản hồi</div>
                                </div>
                            ) : ''
                        }
                    </div>
                    <div className="mt-4">
                        {
                            isShowReplyCommentParentLevel1 ? 
                                <Comment 
                                    type="parent" 
                                    data={{...data , type : "parent"  , level : 1}}
                                    setMessage={(e) => setValueMessageAddComments(e)}
                                /> 
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowComment;