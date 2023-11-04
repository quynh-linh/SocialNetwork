import classNames from "classnames/bind";
import styles from "./ConnectionsLayout.module.scss";
import { SideBarConnections } from "../components/SideBar/Connections";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import HomeConnections from "../components/SideBar/Connections/components/Home";
import FriendsConnections from "../components/SideBar/Connections/components/Friends";
import RequestSent from "~/components/Popper/RequestSent/RequestSent";
import { useState } from "react";
function ConnectionsLayout({children}) {
    const cx = classNames.bind(styles);
    const location = useLocation();
    const [isShowRequestSent,setIsShowRequestSent] = useState(false);
    return (  
        <div className={cx('wrapper','relative')}>
            <Header/>
            <SideBarConnections>
                {
                    location.pathname === '/friends' && (
                        <HomeConnections/>
                    )
                }
                {
                    location.pathname === '/friends/requests' && (
                        <FriendsConnections 
                            title="Lời mời kết bạn"
                            type= 'request'
                            onShow={(e) => setIsShowRequestSent(e)}
                        />
                    )
                }
            </SideBarConnections>
            <div className={cx('wrapper-children')}>
                {children}
            </div>
            {isShowRequestSent ? <RequestSent onClose={(e) => setIsShowRequestSent(e)} /> : ''}
        </div>
    );
}

export default ConnectionsLayout;