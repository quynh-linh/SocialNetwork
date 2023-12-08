import classNames from "classnames/bind";
import styles from "./ShowListComments.module.scss";
import { useEffect, useState } from "react";
import Comment from "../../Comment";
import { useDispatch} from "react-redux";
import { getListParentCommentById } from "~/redux/commentSlice";
import TextComment from "../TextComment";
function ShowListComments({data,isShowBox=false,onMessageUpdateShow=undefined}) {
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
    
    // RENDER DATA PARENT COMMENT BY COMMENT ID
    useEffect(() => {
        const { postId, commentId} = data || {};
        if (postId && commentId) {
            handleGetListParentCommentById(postId,commentId);
        }
    }, [data]);

    // RENDER RE-UPDATES DATA WHEN ADD COMMENT
    useEffect(() => {
        if(valueMessageAddComments && valueMessageAddComments?.data){
            const { message, commentId, postId } = valueMessageAddComments.data;
            if (message === 'success') {
                handleGetListParentCommentById(postId, commentId);
            }
        }
    },[valueMessageAddComments]);

    // RENDER RE-UPDATES DATA WHEN UPDATE COMMENT
    useEffect(() => {
        if (valueMessageUpdateComment && valueMessageUpdateComment.data) {
            const { message, postId, commentId} = valueMessageUpdateComment.data;
            if (message === "success") {
                handleGetListParentCommentById(postId, commentId)
               
            }
        }
    }, [valueMessageUpdateComment]);
    
    return (  
        <div className={cx('wrapper__showComment')}>
            <TextComment 
                onMessageUpdate={(e) => {
                    onMessageUpdateShow({data: e})
                }} 
                data={data} 
                onShowReply={(e) => setShowReplyCommentParentLevel1(e)}
                isShowBoxPost= {isShowBox}
                idFartherParent={data?.parentCommentId}
                type="father"
            />
            <div className={cx('wrapper__showComment-menu','mt-4 ml-24')}>
                <div className={cx('wrapper__showComment-listReplyCommentParent',)}>
                    <div className="mt-4">
                        {
                            valueFirstParentComment !== null && valueFirstParentComment.length > 0  &&(
                                valueFirstParentComment.map((item,index) => 
                                    <TextComment 
                                        key={index}
                                        onMessageUpdate={(e) => setValueMessageUpdateComment({data: e})}
                                        data={item} 
                                        onShowReply={(e) => setShowReplyCommentParentLevel1(e)}
                                        isShowBoxPost= {isShowBox}
                                        idFartherParent={item?.parentCommentId}
                                        type="parent"
                                    />
                                )
                            ) 
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

export default ShowListComments;