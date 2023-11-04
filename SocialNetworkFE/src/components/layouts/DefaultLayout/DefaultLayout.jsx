import classNames from "classnames/bind";
import Header from "../components/Header";
import styles from "./DefaultLayout.module.scss";
import SideBarProfile  from "../components/SideBar/Profile/SideBarProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import SidebarContact from "../components/SideBar/Contact/Contact";
import { useState } from "react";
function DefaultLayout({children}) {
    const cx = classNames.bind(styles);

    return (  
        <div className={cx('container','relative')}>
            <Header/>
            <div className={cx('container__content','flex justify-between')}>
                <SideBarProfile/>
                <div className={cx('container__content-children')}>{children}</div>
                <SidebarContact/>
            </div>
            {/* <div className={cx('container__message')}>
                <FontAwesomeIcon className={cx('container__message-icon')} icon={faMessage} />
            </div> */}
        </div>
    );
}
export default DefaultLayout;