import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useUserToken from "~/hook/user";
import { useDispatch, useSelector } from "react-redux";
import { addComments } from "~/redux/commentSlice";
import currentTime from "~/const/currentTime";
import FountainLoader from "~/components/loader/components/fountain";
function Comment({type='',data,setMessage = undefined}) {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const {valueDetailUserById,nameUrlImageUser} = useUserToken();
    const [valueCommentInPost,setValueCommentInPost] = useState('');
    const [isLoadingAddComment,setIsLoadingAddComment] = useState(false);
    const handleOnchangeInputComment = (e) => {
        setValueCommentInPost(e.target.value);
    };
    const handleAddComment = async (today,content,userId,postId,parentComment) => {
        return await dispatch(addComments({
            createdAt: today,
            content: content,
            userId: userId,
            parentCommentId: parentComment > 0 ? parentComment : '',
            postId: postId
        })).then((item) => {
            if(item?.payload){
                const {message} = item.payload;
                if(message === "success"){
                    setValueCommentInPost("");
                    setMessage({
                        message: message,
                        postId: postId,
                        commentId: parentComment
                    });  
                    setIsLoadingAddComment(false);
                }
            }
        });
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const today = currentTime();
            if(data && valueDetailUserById){
                if(type === 'father'){
                    if(valueCommentInPost !== "" && valueDetailUserById.id !== '' && data.id !== undefined){
                        handleAddComment(today,valueCommentInPost, valueDetailUserById.id,data.id,'')
                    }
                } else if(type === 'parent' && (data.type === 'parent' && data.level === 1)){
                    if(valueCommentInPost !== "" && valueDetailUserById.id !== '' && data.postId !== undefined && data.commentId !== undefined){
                        handleAddComment(today,valueCommentInPost, valueDetailUserById.id,data.postId,data.commentId)
                    }
                }
            }
        }
    };

    useEffect(() => {
        if(valueCommentInPost !== ''){
            setIsLoadingAddComment(true);
        } else {
            setIsLoadingAddComment(false);
        }
    },[valueCommentInPost]);

    return ( 
        <div className={cx('wrapper','w-full flex items-center')}>
            <div className={cx('wrapper__img','flex justify-center')}>
                <img src={nameUrlImageUser ? nameUrlImageUser : images.user} className={cx('wrapper__img-imgUser','flex items-center justify-center w-16 h-16 object-cover')} alt="COMMENTS USER"/>
            </div>
            <div className={cx('wrapper__addComment','')}>
                <input 
                    className={cx('bg-comment')} 
                    type="text" 
                    placeholder="Viết câu trả lời" 
                    onChange={handleOnchangeInputComment}
                    onKeyDown={handleKeyPress}
                    value={valueCommentInPost}
                />
                {
                    isLoadingAddComment ? <div className={cx('wrapper__isLoading')}><FountainLoader/></div> : <FontAwesomeIcon className={cx('wrapper__addComment-icon')} icon={faPaperPlane}/>
                }
            </div>
        </div>
    );
}

export default Comment;