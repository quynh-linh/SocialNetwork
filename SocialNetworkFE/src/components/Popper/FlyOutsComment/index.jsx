
import classNames from 'classnames/bind';
import styles from './FlyOutsComment.module.scss';
import 'tippy.js/dist/tippy.css'; 
import {Wrapper as PopperWrapper} from '~/components/Popper';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless'
import useUserToken from '~/hook/user';
import { useDispatch , useSelector} from "react-redux";
import { removeComment } from '~/redux/commentSlice';
function FlyOutsComment({state = false, children , title,onShow=undefined,data,type="",idFartherParent}) {
    const cx = classNames.bind(styles);
    const [open,setOpen] = useState(false);
    const {valueIdUser} = useUserToken();
    const dispatch = useDispatch();
    //const stateComment = useSelector((state) => state.comment);
    const handleClickUpdateComment = () => {
        onShow({
            isUpdate: true,
            isOpen: false
        });
    };

    const handleClickRemoveComment = async () => {
        if(data && data?.commentId && data?.postId){
            const msg = await dispatch(removeComment({
                id: data.commentId
            }));
            if(msg?.payload?.message === 'Delete success'){
                const removeComment = (commentId) => {
                    onShow({
                        obRemove: {
                            isRemove: true,
                            postId: data?.postId,
                            commentId: commentId,
                            message: 'success',
                        },
                        isOpen: false
                    });
                };
                if (type === 'father') {
                    removeComment(data?.commentId);
                } else if (type === 'parent') {
                    console.log(idFartherParent);
                    removeComment(idFartherParent);
                }
            }
        }
    };

    useEffect(() => {
        setOpen(state);
    },[state]);

    return ( 
        <Tippy
            content= {title}
            visible = {open}
            interactive
            placement='bottom-start'
            appendTo={document.body}
            render={attrs => (
                <div className={cx('content','bg-white')}>
                    <PopperWrapper>
                        <div className={cx('bg-white text-xl font-medium rounded-lg mt-4','wrapper__showComment-content-boxIcon w-60')}>
                            {
                                data?.userId === valueIdUser ?  (
                                    <ul>
                                        <li 
                                            className="px-6 py-2 hover:bg-second hover:text-white hover:cursor-pointer"
                                            onClick={handleClickUpdateComment}
                                        >
                                            Chỉnh sửa
                                        </li>
                                        <li 
                                            className="px-6 py-2 hover:bg-second hover:text-white hover:cursor-pointe"
                                            onClick={handleClickRemoveComment}
                                        >
                                            Xóa
                                        </li>
                                    </ul>
                                ) : (
                                    <ul>
                                        <li 
                                            className="px-6 py-2 hover:bg-second hover:text-white hover:cursor-pointer"
                                            //onClick={handleClickUpdateComment}
                                        >
                                            Ẩn bình luận
                                        </li>
                                        <li className="px-6 py-2 hover:bg-second hover:text-white hover:cursor-pointe">Báo cáo vi phạm</li>
                                    </ul>
                                )
                            } 
                        </div>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default FlyOutsComment;