import classNames from "classnames/bind";
import styles from "./Connections.module.scss"
function SideBarConnections({children}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper','bg-sidebar')}>
            {children}
        </div>
    );
}

export  {SideBarConnections};