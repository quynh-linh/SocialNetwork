import classNames from "classnames/bind";
import styles from "./MessagesLayout.module.scss";
import Header from "../components/Header";
import MessagesSidebar from "../components/SideBar/Messages";
function MessagesLayout({children}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('w-full h-full relative')}>
            <Header/>
            <MessagesSidebar/>
            <div className={cx('mt-24 h-full','children')}>
                {children}
            </div>
        </div>
    );
}

export default MessagesLayout;