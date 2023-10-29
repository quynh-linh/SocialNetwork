import classNames from "classnames/bind";
import styles from "./ConnectionsLayout.module.scss";
import { SideBarConnections } from "../components/SideBar/Connections";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import HomeConnections from "../components/SideBar/Connections/components/Home";
import FriendsConnections from "../components/SideBar/Connections/components/Friends";
function ConnectionsLayout({children}) {
    const cx = classNames.bind(styles);
    const location = useLocation();
    return (  
        <div className={cx('wrapper')}>
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
                        />
                    )
                }
            </SideBarConnections>
            <div className={cx('wrapper-children')}>
                {children}
            </div>
        </div>
    );
}

export default ConnectionsLayout;