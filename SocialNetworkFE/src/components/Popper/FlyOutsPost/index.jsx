
import classNames from 'classnames/bind';
import styles from './FlyOutsPost.module.scss';
import 'tippy.js/dist/tippy.css'; 
import {Wrapper as PopperWrapper} from '~/components/Popper';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless'
import useUserToken from '~/hook/user';
import { useDispatch , useSelector} from "react-redux";
import { deletePost } from '~/redux/postSlice';
import { Toast } from '~/components/toast';
function FlyOutsPost({state = false, children , title,data,onDelete=undefined}) {
    const cx = classNames.bind(styles);
    const [open,setOpen] = useState(false);
    const [valuePostIdSelected,setValuePostIdSelected] = useState('');
    const {valueIdUser} = useUserToken();
    const dispatch = useDispatch();
    const statePost = useSelector(state => state.post);
    //
    const handleClickRemovePost =() => {
        if(data?.id && data?.userID) {
            dispatch(deletePost({
                userId: data.userID,
                postId: data.id
            }))
            setValuePostIdSelected(valuePostIdSelected);
        }
    };

    useEffect(() => {
        setOpen(state);
    },[state])

    useEffect(() => {
        if(statePost.msg === 'Delete success ?'){
            //Toast({type:'success',position:'bottom-left',autoClose:1000,limit:1,des:'edit',content: 'Đã xóa bài viết'});
            onDelete({postId: valuePostIdSelected, state: true});
            setOpen(false);
            window.location.reload();
        }
    },[statePost])

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
                        <div className={cx('bg-white text-xl font-medium rounded-lg w-60' ,'wrapper__showUpdatePost')}>
                            {
                                data?.userID === valueIdUser ? (
                                    <ul>
                                        <li 
                                            className="px-6 py-2 hover:bg-second hover:text-white hover:cursor-pointer"
                                            // onClick={handleClickUpdateComment}
                                        >
                                            Chỉnh sửa
                                        </li>
                                        <li 
                                            className="px-6 py-2 hover:bg-second hover:text-white hover:cursor-pointe"
                                            onClick={handleClickRemovePost}
                                        >
                                            Xóa
                                        </li>
                                    </ul>
                                ) : (
                                    <ul>
                                        <li className="px-6 py-2 hover:bg-second hover:text-white hover:cursor-pointer">
                                            Ẩn bài viết
                                        </li>
                                        <li className="px-6 py-2 hover:bg-second hover:text-white hover:cursor-pointe">
                                            Lưu bài viết
                                        </li>
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

export default FlyOutsPost;