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
import { Link } from "react-router-dom";
import BoxSearch from "~/components/Popper/BoxSearch";
import { useDispatch, useSelector } from "react-redux";
import { getListUserBySearch } from "~/redux/authSlice";
import useUserToken from "~/hook/user";
function Header() {
    const cx = classNames.bind(styles);
    const [isOpenMenuUser,setOpenMenuUser] = useState(false);
    const [isOpenMenuPage,setOpenMenuPage] = useState(false);
    const [isOpenMenuAccount,setOpenMenuAccount] = useState(false);
    const [isShowBoxSearch,setShowBoxSearch] = useState(false);
    const [listUserBySearch,setListUserBySearch] = useState([]);
    const {nameUrlImageUser,valueDetailUserById} = useUserToken();
    const [anchorEl, setAnchorEl] = useState(null);
    const menuPageRef = useRef(null);
    const menuUserRef = useRef(null);
    const menuAccountRef = useRef(null);
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);
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
    };

    // 
    const handleOnChangeInputSearch = (e) => {
        const name = e.target.value;
        if(name !== ''){
            dispatch(getListUserBySearch({
                name : name
            })).then((item) => {
                if(item && item.payload && !item.payload.message){
                    setListUserBySearch(item.payload);
                }
            })
        } else {
            setListUserBySearch([])
        }
    };

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
                        <div className={cx('header__Controls')}>
                            <FontAwesomeIcon className={cx('header__Controls-icon')} icon={faMessage}/>
                        </div>
                        <div className={cx('header__Controls')}>
                            <FontAwesomeIcon className={cx('header__Controls-icon')} icon={faGear}/>
                        </div>
                        <div className={cx('header__Controls')}>
                            <FontAwesomeIcon className={cx('header__Controls-icon')} icon={faBell}/>
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