import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import classNames from 'classnames/bind';
import styles from "./BoxPost.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Comment from '~/components/form/Comment/Comment';
import Post from '~/components/Post/Post';
import { getListCommentByPost } from '~/redux/commentSlice';
import { useDispatch, useSelector } from "react-redux";
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 750,
    bgcolor: '#202227',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    height: 510,
    borderRadius: '20px',
};
export default function BoxPostModal({closeIsShow=true,data}) {
    const cx = classNames.bind(styles);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();
    const [valueMessageAddComments,setValueMessageAddComments] = useState('');
    const handleClose = () => {
        setOpen(false);
        closeIsShow(false);
    };

    // HANDLE GET LIST COMMENTS
    const handleGetListComments = async (id) => {
        return await dispatch(getListCommentByPost({
            id: id,
            limit: 100
        })).then((item) => {
            const ob = item && item.payload && !item.payload.message ? item.payload : null;
            //setValueFirstComment(ob);
        })
    }
   
    useEffect(() => {
        if(data.isShow){
            setOpen(true);
        } 
    },[data]);

    // RENDER GET LIST COMMENTS AGAIN WHEN MESSAGE === SUCCESS
    useEffect(() => {
        if(valueMessageAddComments === "success"){
            handleGetListComments(data.id);
        }
    },[valueMessageAddComments]);
    
    return (
        <Modal
            open={open}
            onClose={handleClose}
            disableEnforceFocus
            disableAutoFocus
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={cx('wrapper')}>
                    <div className={cx('wrapper__header','text-center relative')}>
                        <h1 className='py-8 text-3xl font-semibold'>Bài viết của {data && data.lastName ? data.lastName : ""}</h1>
                        <FontAwesomeIcon className={cx('wrapper__header-icon')} icon={faClose} onClick={handleClose}/>
                    </div>
                    <div className={cx('wrapper__content','overflow-y-auto')}>
                        <Post message={valueMessageAddComments} isShowBox={data.isShow} data={data}/>
                    </div>
                    <div className={cx('wrapper__footer')}>
                        <Comment type="father" data={data} setMessage={(e) => setValueMessageAddComments(e)}/>
                    </div>
                </div>
            </Box>
        </Modal>
    );
}