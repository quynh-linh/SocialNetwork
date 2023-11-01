import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./Header.module.scss"
import images from "~/assets/images";
import FlyOutsMenu from "~/components/Popper/FlyOutsMenu";
import { faBell, faChevronDown, faGear} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
import FlyOutUser from "~/components/Popper/FlyOutsUser";
import { useEffect, useRef, useState } from "react";
import { DATA_MENU_PAGES } from "~/const/data";
import { Link } from "react-router-dom";
function Header() {
    const cx = classNames.bind(styles);
    const [isOpenMenuUser,setOpenMenuUser] = useState(false);
    const [isOpenMenuPage,setOpenMenuPage] = useState(false);
    const [isOpenMenuAccount,setOpenMenuAccount] = useState(false);
    const menuPageRef = useRef(null);
    const menuUserRef = useRef(null);
    const menuAccountRef = useRef(null);
    // HANDLE CLICK OPEN MENU USER
    const handleCLickOpenMenuUser = () => {
        setOpenMenuUser(!isOpenMenuUser);
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
                <Link to={'/'}><img src={images.logo} alt="Logo"></img></Link>
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
                        <FlyOutUser
                            title={'Account'}
                            state={isOpenMenuUser}
                        >
                            <div ref={menuUserRef}  className={cx('header__Controls-User')} onClick={handleCLickOpenMenuUser}>
                                <img
                                   
                                    className={cx('header__Controls-User-img','h-16 w-16')}
                                    src={images.user}
                                    alt="user"
                                />
                            </div>
                        </FlyOutUser>
                    </div>
                </div>
            </header>
        </div>    
    );
}

export default Header;