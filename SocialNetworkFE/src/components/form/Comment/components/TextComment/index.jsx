import classNames from "classnames/bind";
import styles from "../ShowFirstComment/ShowComment.module.scss";
import images from "~/assets/images";
import { useEffect, useRef, useState } from "react";
import calculateTime from "~/const/calculateTime";
import { useDispatch} from "react-redux";
import { updateComments } from "~/redux/commentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import FlyOutsComment from "~/components/Popper/FlyOutsComment";
import MenuComment from "../MenuComment";
export default function TextComment({data,onShowReply,onMessageUpdate=undefined,isShowBoxPost=false,idFartherParent,type=""}) {
    const cx = classNames.bind(styles);
    const [open, setOpen] = useState(false);
    const [isUpdateComment,setIsUpdateComment] = useState(false);
    const [isRemoveComment,setIsRemoveComment] = useState(false);
    const [valueUpdateComment,setValueUpdateComment] = useState('');
    const inputRef = useRef();
      
    const dispatch = useDispatch();

    const handleClick = () => {
        setOpen((previousOpen) => !previousOpen);
    };

    const handleUpdateComment = async (content,id) => {
        try {
            const msg = await dispatch(updateComments({
                content: content,
                id: id
            }));
            if (msg?.payload?.message === "Update success"){
                const updateMessage = (commentId) => {
                    onMessageUpdate({
                        message: "success",
                        postId: data.postId,
                        commentId: commentId,
                    });
                };        
                if (type === "father") {
                    updateMessage(data.commentId);
                } else if (type === "parent") {
                    updateMessage(data.parentCommentId);
                }
                setIsUpdateComment(false);
            }
        } catch (error) {
            
        }
    };
  
    const handleEscKey = (event) => {
        if (event.key === 'Escape') {       
            setIsUpdateComment(false);
            setOpen(false);
        } else if(event.key === 'Enter'){
            if(data?.commentId && valueUpdateComment !== ''){
                handleUpdateComment(valueUpdateComment,data.commentId);
            }
        }
    };

    const handleCancelUpdateComment = () => {
        setIsUpdateComment(false);
        setOpen(false);
    }


    const handleOnchangeValueUpdate = (e) => {
        setValueUpdateComment(e.target.value);
    }

    useEffect(() => {
        if(data && data.content) setValueUpdateComment(data.content);
    },[data]);

    useEffect(() => {
        if(isUpdateComment) {
            inputRef.current.focus();

            window.addEventListener('keydown', handleEscKey);

            return () => {
                window.removeEventListener('keydown', handleEscKey);
            };
        };
    },[isUpdateComment,valueUpdateComment]);

    useEffect(() => {
        if (isRemoveComment) {
            const { message, postId, commentId , parentId } = isRemoveComment || {};
            onMessageUpdate({
                message,
                postId,
                commentId,
                parentId
            });
        }
    }, [isRemoveComment]);

    return (
        <div>
            <div className={cx('flex items-center')}>
                <div className={cx('wrapper__img')}>
                    <img 
                        src={data?.avatarUser ? data.avatarUser : images.user} 
                        className={cx('wrapper__img-imgUser','flex items-center justify-center w-16 h-16 object-cover')} 
                        alt="COMMENTS USER"
                    />
                </div>
                <div className={cx('wrapper__showComment-width','flex items-center')}>
                    {
                        !isUpdateComment ? (
                            <div className={cx('wrapper__showComment-content','bg-comment flex justify-between')}>
                                <div>
                                    <div className={cx('wrapper__showComment-content-title','text-white font-semibold text-2xl')}>
                                        {data?.firstName && data?.lastName ? data.firstName + " " + data.lastName : ''}
                                    </div>
                                    <div className={cx('wrapper__showComment-content-des','mt-3')}>{data?.content ? data.content : ''}</div>
                                </div>
                                <div className={cx('wrapper__showComment-content-timeAt','')}>{data?.createdAt ? calculateTime(data.createdAt) : '0s'}</div>
                            </div>
                        ) : (
                            <div className={cx('wrapper__showComment-content','bg-comment flex justify-between relative items-center')}>
                                <input 
                                    ref={inputRef}
                                    className="bg-comment w-full outline-none text-color-text placeholder:text-color-text"
                                    value={valueUpdateComment} 
                                    onChange={handleOnchangeValueUpdate}
                                />
                                <FontAwesomeIcon className={cx('wrapper__showComment-content-iconSend','text-color-text')} icon={faPaperPlane}/>
                            </div>
                        )
                    }
                    <FlyOutsComment
                        state={open}
                        data= {data}
                        idFartherParent={idFartherParent}
                        onShow={((e) => {
                            const {isUpdate,isOpen,obRemove} = e || {};
                            setIsRemoveComment(obRemove);
                            setIsUpdateComment(isUpdate);
                            setOpen(isOpen);
                        })}
                        type={type}
                    >
                        <FontAwesomeIcon 
                            onClick={handleClick} 
                            className={cx("text-color-text",'wrapper__showComment-content-icon')} 
                            icon={faEllipsisVertical}
                        />
                    </FlyOutsComment>
                </div>
            </div>
            <div className={cx(isShowBoxPost ? 'ml-32' : 'ml-28')}>
                {
                    !isUpdateComment ? (
                        <MenuComment onClickReply={(e) => onShowReply(e)}/>
                    ) : (
                        (
                            !isShowBoxPost ? (
                                <p className="mt-4 text-xl font-medium text-color-text">
                                    Nhấn <span className="text-primaryColor">Esc</span> để hủy
                                </p>
                            ) : (
                                <p className="mt-4 text-primaryColor text-xl font-medium underline" onClick={handleCancelUpdateComment}>Hủy</p>
                            )
                        )
                    )
                }
            </div>
        </div> 
    )
}