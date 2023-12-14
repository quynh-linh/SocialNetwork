
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './FlyOutsNotify.module.scss';
import 'tippy.js/dist/tippy.css'; 
import {Wrapper as PopperWrapper} from '~/components/Popper';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import useUserToken from '~/hook/user';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import calculateTime from '~/const/calculateTime';
import { fromNotificationToPostOrUserDetail, updateStatusNotificationReaDed } from '~/redux/notificationSlice';
function FlyOutsNotify({state = false , data , anchor,onClose,onShowCount}) {
    const cx = classNames.bind(styles);

    const [anchorEl, setAnchorEl] = useState(null);
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //
    const handleClose = () => {
        onClose(false);
        setOpen(false);
    };

    const handelClickToNotification = (item) => {
        onShowCount(0);
        console.log(item);
        if(item.post_id === 0) {
            navigate(`/friends/requests?id=${item.user_id}`);
        }
        dispatch(fromNotificationToPostOrUserDetail({id : item.id}));
        dispatch(updateStatusNotificationReaDed({id : item.id}));
    };

    useEffect(() => {
        if(state) setOpen(true);
        setAnchorEl(anchor);
    },[state,anchor])

    return ( 
        <div className='mt-5'>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
                style={{ marginTop : '10px'}}
            >
                <div className={cx('content','text-search')}>
                    <PopperWrapper>
                        <div className='py-8 px-6'>
                            <div className='flex items-center justify-between mt-4'>
                                <h1 className='text-4xl font-semibold'>Thông Báo</h1>
                                <FontAwesomeIcon className='' icon={faEllipsisVertical}/>
                            </div>
                            <div className='flex items-center mt-8'>
                                <h2 className='text-2xl font-semibold py-4 px-6 bg-second text-text-primary rounded-2xl'>Tất cả</h2>
                                <h2 className='text-2xl font-semibold ml-6'>Chưa đọc</h2>
                            </div>
                            <div className='flex items-center mt-8 justify-between'>
                                <h2 className='text-2xl font-semibold '>Trước đó</h2>
                                <h2 className='text-2xl font-semibold'>Xem tất cả</h2>
                            </div>
                            <div className='mt-8'>
                                {
                                    data.map((item,index) => {
                                        return (
                                            <div 
                                                key={index} 
                                                className='flex items-center p-4 rounded-lg hover:cursor-pointer hover:bg-background'
                                            >
                                                <div className='relative w-1/5'>
                                                    <img src={item.image} className='w-28 h-28 rounded-full' alt='notify'/>
                                                    <FontAwesomeIcon 
                                                        className='text-2xl absolute bottom-0 right-2 text-white p-1 bg-primaryColor rounded-full' 
                                                        icon={faBell}
                                                    />
                                                </div>
                                                <div 
                                                    className={cx('ml-4 relative w-4/5',item.status === 0 ? 'text-search' : 'text-color-text')}
                                                    onClick={(e) =>  handelClickToNotification(item)}
                                                >
                                                    <h1>
                                                        <span className='font-semibold'>{item.nameUser}</span> 
                                                        {item.content}
                                                    </h1>
                                                    <span 
                                                        className='text-xl font-bold text-text-primary pr-4'
                                                    >
                                                        {calculateTime(item.create_at)}
                                                    </span>
                                                    {
                                                        item.status === 0 ? <div className='absolute right-0 top-0 bottom-0 m-auto w-4 h-4 rounded-full bg-primaryColor'></div> : ''
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                } 
                            </div>
                        </div>
                    </PopperWrapper>
                </div>
            </Menu>
        </div>
    );
}

export default FlyOutsNotify;