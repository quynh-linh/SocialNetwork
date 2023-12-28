import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./Header.module.scss"
import images from "~/assets/images";
import FlyOutsMenu from "~/components/Popper/FlyOutsMenu";
import { faArrowLeft, faBell, faChevronDown, faGear, faSearch} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import FlyOutUser from "~/components/Popper/FlyOutsUser";
import { useEffect, useRef, useState } from "react";
import { DATA_MENU_PAGES } from "~/const/data";
import { Link , createSearchParams, useNavigate , useLocation } from "react-router-dom";
import BoxSearch from "~/components/Popper/BoxSearch";
import { useDispatch, useSelector } from "react-redux";
import { getListUserBySearch } from "~/redux/authSlice";
import useUserToken from "~/hook/user";
import FlyOutsNotify from "~/components/Popper/FlyOutsNotify";
import { getCountNotificationUnread, getNotification } from "~/redux/notificationSlice";
function Header() {
    const cx = classNames.bind(styles);

    const [isOpenMenuUser,setOpenMenuUser] = useState(false);
    const [isOpenMenuPage,setOpenMenuPage] = useState(false);
    const [isOpenNotify,setOpenNotify] = useState(false);
    const [isOpenMenuAccount,setOpenMenuAccount] = useState(false);
    const [isShowBoxSearch,setShowBoxSearch] = useState(false);

    const [valueInputSearch,setValueInputSearch] = useState('');
    const [valueCountNotify,setValueCountNotify] = useState('');

    const [listUserBySearch,setListUserBySearch] = useState([]);
    const [listNotifyByUser,setListNotifyByUser] = useState([]);
    const {nameUrlImageUser,valueDetailUserById,valueIdUser} = useUserToken();

    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorNotify, setAnchorNotify] = useState(null);

    const menuPageRef = useRef(null);
    const menuUserRef = useRef(null);
    const menuAccountRef = useRef(null);

    //
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    //
    const state = useSelector(state => state.auth);
    const stateNotify = useSelector(state => state.notify);


    // HANDLE CLICK OPEN MENU USER
    const handleCLickOpenMenuUser = (event) => {
        setOpenMenuUser(!isOpenMenuUser);
        setAnchorEl(event.currentTarget);
        setOpenMenuPage(false);
        setOpenMenuAccount(false);
    };

    // HANDLE CLICK OPEN MENU PAGE
    const handleClickOpenMenuPage = () => {
        setOpenMenuPage(!isOpenMenuPage);
        setOpenMenuUser(false);
        setOpenMenuAccount(false);
    };

    // HANDLE CLICK OPEN MENU PAGE
    const handleClickOpenMenuAccount = () => {
        setOpenMenuAccount(!isOpenMenuAccount);
        setOpenMenuUser(false);
        setOpenMenuPage(false);
    };

    // HANDLE CLICK INPUT SEARCH
    const handleClickInputSearch = () => {
        setShowBoxSearch(true);
    };

    // HANDLE CLOSE BOX SEARCH
    const handleClickCloseBoxSearch = () => {
        setShowBoxSearch(false);
        setListUserBySearch([]);
    };

    // HANDLE ON CHANGE VALUE IP SEARCH
    const handleOnChangeInputSearch = (e) => {
        const name = e.target.value;
        if(valueIdUser !== undefined){
            dispatch(getListUserBySearch({
                name: name,
                userId: valueIdUser,
                limit: 100
            }));
        }
        setValueInputSearch(name);
    };

    // HANDLE CLICK SHOW NOTIFY
    const handleCLickShowNotify = (event) => {
        setValueCountNotify(null);
        setOpenNotify(!isOpenNotify);
        setAnchorNotify(event.currentTarget);
        setOpenMenuPage(false);
        setOpenMenuAccount(false);
    };

    // HANDLE KET PRESS
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            const params = {
                q: valueInputSearch !== '' ? valueInputSearch : '' ,
            };
            navigate(`/search?${createSearchParams(params)}`);
            setShowBoxSearch(false);
        }
    };

    useEffect(() => {
        const { isLoading, arrSearch } = state;
        if(state?.msg === 'userId and name is required'){
            setListUserBySearch([]);
        } else {
            if (!isLoading && arrSearch.length > 0) {
                setListUserBySearch(arrSearch);
            }
        }
    }, [state]);

    useEffect(() => {
        if(valueIdUser !== undefined){
            dispatch(getNotification({userId: valueIdUser, limit: 1000}));
            dispatch(getCountNotificationUnread({userId: valueIdUser}));
        }   
    },[valueIdUser]);


    useEffect(() => {
        setListNotifyByUser(stateNotify.arrNotify ?? []);
    }, [stateNotify.arrNotify]);

    useEffect(() => {
        setValueCountNotify(stateNotify.count ?? 0);
    }, [stateNotify.count]);
    
    useEffect(() => {
        if(query !== null){
            setValueInputSearch(query);
        };
    }, [query]);

    useEffect(() => {
        // HANDLE CLICK
        const handleClickOutside = (event) => {
            if (menuPageRef.current && !menuPageRef.current.contains(event.target)) {
                setOpenMenuPage(false);
            } 
            if(menuUserRef.current && !menuUserRef.current.contains(event.target)){
                setOpenMenuUser(false);
            } 
            if(menuAccountRef.current && !menuAccountRef.current.contains(event.target)){
                setOpenMenuAccount(false);
            }
        };

        // ADD EVENT LISTENER CLICK FOR WINDOW
        document.addEventListener('click', handleClickOutside);
    
        // REMOVE EVENT LISTENER CLICK FOR WINDOW
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className={cx('flex justify-center bg-sidebar','header')}>
            <header className={cx('w-full flex items-center justify-between text-white','header__content')}>
                <BoxSearch
                    title={'Trang'}
                    items={listUserBySearch}
                    state={isShowBoxSearch}
                    isLoading={isShowBoxSearch ? state.isLoading : true}
                    onClose={(e) => {
                        if(!e) setListUserBySearch([])
                    }}
                >
                    <div className={cx("flex items-center",'header__content-search')}>
                        <div className={cx("text-center",isShowBoxSearch ? 'w-1/6' : 'w-1/5 ')}>
                            {
                                isShowBoxSearch ? 
                                    <FontAwesomeIcon className={cx('header__content-search-icon')} icon={faArrowLeft} onClick={handleClickCloseBoxSearch} /> 
                                    : <Link to={'/'}><img src={images.logo} alt="Logo" ></img></Link>
                            }
                        </div>
                        <div className={cx('header__content-boxSearch-search','flex items-center ml-4 relative',isShowBoxSearch ? 'w-5/6' : 'w-4/5')}>
                            <FontAwesomeIcon className={cx('header__content-boxSearch-search-icon')} icon={faSearch}/>
                            <input 
                                type="text" 
                                placeholder="Tìm kiếm trên SGU CV" 
                                name="search"
                                onClick={handleClickInputSearch}
                                onChange={handleOnChangeInputSearch}
                                onKeyDown={handleKeyPress}
                                value={valueInputSearch}
                            />
                        </div>
                    </div>
                </BoxSearch>
                <div className={cx('flex items-center justify-around')}>
                    <div className={cx('flex items-center justify-between')}>
                        {/* PAGES */}
                        <FlyOutsMenu
                            title={'Trang'}
                            items={DATA_MENU_PAGES}
                            state={isOpenMenuPage}
                        >
                            <div ref={menuPageRef} className={cx('header__MenuItems')} 
                                onClick={handleClickOpenMenuPage}
                            >
                                <span>Trang</span>
                                <FontAwesomeIcon className={cx('header__MenuItems-icon')} icon={faChevronDown}/>
                            </div>
                        </FlyOutsMenu>
                        {/* ACCOUNT */}
                        <FlyOutsMenu
                            title={'Tài khoản'}
                            items={DATA_MENU_PAGES}
                            state={isOpenMenuAccount}
                        >
                            <div ref={menuAccountRef} className={cx('header__MenuItems')} onClick={handleClickOpenMenuAccount}>
                                <span>Tài khoản</span>
                                <FontAwesomeIcon className={cx('header__MenuItems-icon')} icon={faChevronDown}/>
                            </div>
                        </FlyOutsMenu>
                        {/* MY NETWORKS */}
                        <FlyOutsMenu
                            title={'Công nghệ'}
                            items={DATA_MENU_PAGES}
                            state={false}
                        >
                            <div className={cx('header__MenuItems')}>
                                <span>Công nghệ</span>
                                <FontAwesomeIcon className={cx('header__MenuItems-icon')} icon={faChevronDown}/>
                            </div>
                        </FlyOutsMenu>
                    </div>
                    <div className={cx('flex items-center justify-between')}>
                        <div className={cx('header__Controls')}
                            onClick={() => navigate('/messages')}>
                            <FontAwesomeIcon 
                                className={cx('header__Controls-icon','hover:cursor-pointer hover:bg-primaryColor hover:text-white')} 
                                icon={faMessage}
                            />
                        </div>
                        <div className={cx('header__Controls')}>
                            <FontAwesomeIcon 
                                className={cx('header__Controls-icon','hover:cursor-pointer hover:bg-primaryColor hover:text-white')} 
                                icon={faGear}
                            />
                        </div>
                        <div className={cx('header__Controls')}>
                            <div className="relative">
                                <FontAwesomeIcon
                                    className={cx('header__Controls-icon','hover:cursor-pointer hover:bg-primaryColor hover:text-white'
                                    ,isOpenNotify ? 'bg-primaryColor' : '')}
                                    icon={faBell}
                                    onClick={handleCLickShowNotify}
                                />
                                {
                                    valueCountNotify > 0 && (
                                        <span 
                                            className="absolute -top-0.5 right-0 py-1 px-3 font-bold rounded-full text-lg bg-error"
                                        >
                                            {valueCountNotify}
                                        </span>
                                    )
                                }
                            </div>
                            <FlyOutsNotify
                                state={isOpenNotify}
                                data = {listNotifyByUser}
                                anchor= {anchorNotify}
                                onClose = {(e) => setOpenNotify(e)}
                                onShowCount= {(e) => setValueCountNotify(e)}
                            />
                        </div>
                        {/* FLY OUTS USER */}
                        <div className={cx('header__Controls-User')} onClick={handleCLickOpenMenuUser}>
                            <img
                                
                                className={cx('header__Controls-User-img','h-16 w-16 object-cover')}
                                src={nameUrlImageUser ? nameUrlImageUser : images.user}
                                alt="user"
                            />
                        </div>
                        <FlyOutUser
                            state={isOpenMenuUser}
                            data = {valueDetailUserById}
                            anchor= {anchorEl}
                            onClose = {(e) => setOpenMenuUser(e)}
                        />
                    </div>
                </div>
            </header>
        </div>    
    );
}

export default Header;