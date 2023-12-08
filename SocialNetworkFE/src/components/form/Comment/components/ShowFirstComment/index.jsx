import classNames from "classnames/bind";
import styles from "./ShowComment.module.scss";
import { useEffect, useState } from "react";
import Comment from "../../Comment";
import { useDispatch} from "react-redux";
import { getListParentCommentById } from "~/redux/commentSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowTurnDown} from "@fortawesome/free-solid-svg-icons";
import TextComment from "../TextComment";
function ShowFirstComment({data,isShowBox=false,onMessageUpdateShow=undefined}) {
    const cx = classNames.bind(styles);

    const [isShowReplyCommentParentLevel1,setShowReplyCommentParentLevel1] = useState(false);
    const [isShowReplyCommentParentLevel2,setShowReplyCommentParentLevel2] = useState(false);
    const [valueMessageAddComments,setValueMessageAddComments] = useState('');
    const [valueMessageUpdateComment,setValueMessageUpdateComment] = useState({});
    const [valueFirstParentComment,setValueFirstParentComment] = useState([]);
    const dispatch = useDispatch();

    // HANDLE GET LIST PARENT COMMENT BY COMMENT ID 
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

    // HANDLE RENDER FIRST PARENT COMMENT
    const renderFirstParentComment = () => {
        if (valueFirstParentComment !== null &&valueFirstParentComment.length > 0) {
            const firstParentComment = valueFirstParentComment[0];
            return (
                <TextComment
                    onMessageUpdate={(e) =>setValueMessageUpdateComment({data: e,})}
                    data={firstParentComment}
                    onShowReply={(e) => setShowReplyCommentParentLevel2(e)}
                    idFartherParent={firstParentComment?.parentCommentId}
                    type="parent"
                />
            );
        }
        return null;
    };
      
    // HANDLE UPDATE DATA (COMMENT)
    const handleUpdateData = (messageData) => {
        if (messageData?.data) {
            const { message, postId, commentId } = messageData.data;
            if (message === 'success') {
                handleGetListParentCommentById(postId, commentId);
            }
        }
    };
    
    // RENDER RE-UPDATES DATA WHEN ADD COMMENT
    useEffect(() => {
        handleUpdateData(valueMessageAddComments);
    }, [valueMessageAddComments]);
    
    // RENDER RE-UPDATES DATA WHEN UPDATE COMMENT
    useEffect(() => {
        handleUpdateData(valueMessageUpdateComment);
    }, [valueMessageUpdateComment]);

    // RENDER DATA PARENT COMMENT BY COMMENT ID
    useEffect(() => {
        const { postId, commentId} = data || {};
        if (postId && commentId) {
            handleGetListParentCommentById(postId, commentId);
        }
    }, [data]);
       
    return (  
        <div className={cx('wrapper__showComment')}>
            <TextComment 
                onMessageUpdate={(e) => onMessageUpdateShow({data: e})} 
                data={data} 
                onShowReply={(e) => setShowReplyCommentParentLevel1(e)}
                isShowBoxPost= {isShowBox}
                idFartherParent={data?.parentCommentId}
                type="father"
            />
            <div className={cx('wrapper__showComment-menu','mt-4 ml-24')}>
                <div className={cx('wrapper__showComment-listReplyCommentParent',)}>
                    <div className="mt-4">
                        {renderFirstParentComment()}
                        {
                            valueFirstParentComment !== null && (
                                <div className="ml-20 mt-5">
                                    {
                                        isShowReplyCommentParentLevel2 ? <Comment/> : ""
                                    }
                                </div>
                            )   
                        }
                        {/* SEE ALL REPLY */}
                        {
                            !isShowBox && valueFirstParentComment !== null &&  valueFirstParentComment.length >= 2 ? (
                                <div className="ml-20 mt-4 flex items-center font-semibold ">
                                    <FontAwesomeIcon icon={faArrowTurnDown}/>
                                    <div className="ml-4 hover:underline cursor-pointer">Xem tất cả phản hồi</div>
                                </div>
                            ) : ''
                        }
                    </div>
                    <div className="my-4">
                        {
                            isShowReplyCommentParentLevel1 ? 
                                <Comment 
                                    type="parent" 
                                    data={{...data , type : "parent"  , level : 1}}
                                    setMessage={(e) => setValueMessageAddComments({data: e})}
                                /> 
                            : ""
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowFirstComment;