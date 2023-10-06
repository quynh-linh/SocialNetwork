import classNames from "classnames/bind";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./Header.module.scss"
import images from "~/assets/images";
import FlyOutsMenu from "~/components/Popper/FlyOutsMenu";
import { faBell, faChevronDown, faGear} from "@fortawesome/free-solid-svg-icons";
import { faMessage } from "@fortawesome/free-regular-svg-icons";
function Header() {
    const cx = classNames.bind(styles);
    const DATA_PAGES = [
        {
            id: 0,
            name: 'Albums'
        }
    ];
    return (
        <div className={cx('flex justify-center bg-black','header')}>
            <header className={cx('w-full flex items-center justify-between text-white','header__content')}>
                <img src={images.logo} alt="Logo"></img>
                <div className={cx('flex items-center justify-around')}>
                    <div className={cx('flex items-center justify-between')}>
                        {/* PAGES */}
                        <FlyOutsMenu
                            title={'Pages'}
                            items={DATA_PAGES}
                            state={false}
                        >
                            <div className={cx('header__MenuItems')}>
                                <span>Pages</span>
                                <FontAwesomeIcon className={cx('header__MenuItems-icon')} icon={faChevronDown}/>
                            </div>
                        </FlyOutsMenu>
                        {/* ACCOUNT */}
                        <FlyOutsMenu
                            title={'Account'}
                            items={DATA_PAGES}
                            state={false}
                        >
                            <div className={cx('header__MenuItems')}>
                                <span>Account</span>
                                <FontAwesomeIcon className={cx('header__MenuItems-icon')} icon={faChevronDown}/>
                            </div>
                        </FlyOutsMenu>
                        {/* MY NETWORKS */}
                        <FlyOutsMenu
                            title={'My Networks'}
                            items={DATA_PAGES}
                            state={false}
                        >
                            <div className={cx('header__MenuItems')}>
                                <span>My Networks</span>
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
                        <div className={cx('header__Controls-User')}>
                            <img className={cx('header__Controls-User-img','h-16 w-16')} src={images.user}/>
                        </div>
                    </div>
                </div>
            </header>
        </div>    
    );
}

export default Header;