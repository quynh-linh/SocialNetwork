import classNames from "classnames/bind";
import Header from "../components/Header";
import styles from "./DefaultLayout.module.scss";
import SideBarProfile  from "../components/SideBar/Profile/SideBarProfile";
import SidebarContact from "../components/SideBar/Contact/Contact";
function DefaultLayout({children}) {
    const cx = classNames.bind(styles);

    return (  
        <div id="defaultLayout" className={cx('container','relative')}>
            <Header/>
            <SideBarProfile/>
            <div className={cx('container__content')}>{children}</div>
            <SidebarContact/>
        </div>
    );
}
export default DefaultLayout;