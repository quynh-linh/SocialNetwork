
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './FlyOutsUser.module.scss';
import 'tippy.js/dist/tippy.css'; 
import {Wrapper as PopperWrapper} from '~/components/Popper';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleHalfStroke, faGear, faHandshake, faMoon, faPowerOff, faSun } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";
import { logOut } from '~/redux/authSlice';
import useUserToken from '~/hook/user';
function FlyOutUser({state = false , data , anchor,onClose}) {
    const cx = classNames.bind(styles);
    const [modeBackgroundWindowDark,setModeBackgroundWindowDark] = useState(true);
    const [modeBackgroundWindowLight,setModeBackgroundWindowLight] = useState(false);
    const [modeBackgroundWindowAuto,setModeBackgroundWindowAuto] = useState(false);
    const {valueIdUser} = useUserToken();
    const [anchorEl, setAnchorEl] = useState(null);
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleClose = () => {
        onClose(false);
        setOpen(false);
    };

    const handleSetModeBgDark = () => {
        setModeBackgroundWindowDark(!modeBackgroundWindowDark);
        setModeBackgroundWindowLight(false);
        setModeBackgroundWindowAuto(false);
    };

    const handleSetModeBgLight = () => {
        setModeBackgroundWindowLight(!modeBackgroundWindowLight);
        setModeBackgroundWindowDark(false);
        setModeBackgroundWindowAuto(false);
    };

    const handleSetModeBgAuto = () => {
        setModeBackgroundWindowAuto(!modeBackgroundWindowAuto);
        setModeBackgroundWindowDark(false);
        setModeBackgroundWindowLight(false);
    };

    const handleClickLogOut =() => {
        dispatch(logOut());
        navigate('/login');
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
                <div className={cx('content','bg-white')}>
                    <PopperWrapper>
                        <div className={cx('container',' p-5')}>
                            <div className={cx('container-header','flex items-center')}>
                                <img src={data && data.image ? data.image : images.user} className={cx('w-20 h-20 rounded-full object-cover')} alt='user'/>
                                <div className={cx('pl-5')}>
                                    <div className={cx('container-header-title')}>{data && data.firstName && data.lastName ? data.firstName + " " + data.lastName : ''}</div>
                                    <div className={cx('container-header-job','text-color-text')}>Web Developer</div>
                                </div>
                            </div>
                            <div className={cx('container-viewProfile')}>
                                <Link to={`/profile?id=${valueIdUser}`}>
                                   Xem trang cá nhân
                                </Link>
                            </div>
                            <div className={cx('container-menuTool')}>
                                <div className={cx('container-menuTool-item','flex items-center')}>
                                    <FontAwesomeIcon className={cx('w-2/12')} icon={faGear}/>
                                    <span className={cx('pl-5 w-10/12')}>Cài đặt & Quyền riêng tư</span>
                                </div>
                                <div className={cx('container-menuTool-item','flex items-center')}>
                                    <FontAwesomeIcon className={cx('w-2/12')} icon={faHandshake}/>
                                    <span className={cx('pl-5 w-10/12')}>Hỗ trợ</span>
                                </div>
                            </div>
                            <div className={cx('container-logOut')}>
                                <FontAwesomeIcon className={cx('w-2/12')} icon={faPowerOff}/>
                                <button 
                                    className={cx('pl-5 w-10/12 text-start')} 
                                    type="button"
                                    onClick={handleClickLogOut}
                                >
                                    Đăng xuất
                                </button>
                            </div>
                            <div className={cx('container-mode','flex items-center')}>
                                <span className={(cx('w-1/5'))}>Chế độ:</span>
                                <div className={cx('flex items-center justify-between w-4/5')}>
                                    <Tippy content='Dark'>
                                        <button onClick={handleSetModeBgDark} className={cx('w-16 - h-16',modeBackgroundWindowDark ? 'container-mode-setChecked' : '')}  type='button'>
                                            <FontAwesomeIcon icon={faMoon}/>
                                        </button>
                                    </Tippy>
                                    <Tippy content='Light'>
                                        <button onClick={handleSetModeBgLight}  className={cx('w-16 - h-16',modeBackgroundWindowLight ? 'container-mode-setChecked' : '')}  type='button'>
                                            <FontAwesomeIcon icon={faSun}/>
                                        </button>
                                    </Tippy>
                                    <Tippy content='Auto'>
                                        <button onClick={handleSetModeBgAuto}  className={cx('w-16 - h-16',modeBackgroundWindowAuto ? 'container-mode-setChecked' : '')}  type='button'>
                                            <FontAwesomeIcon icon={faCircleHalfStroke}/>
                                        </button>
                                    </Tippy>
                                </div>
                            </div>
                        </div>
                    </PopperWrapper>
                </div>
            </Menu>
        </div>
    );
}

export default FlyOutUser;