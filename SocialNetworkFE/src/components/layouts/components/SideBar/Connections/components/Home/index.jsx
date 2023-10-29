import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faGear } from "@fortawesome/free-solid-svg-icons";
import { DATA_CONNECTIONS } from "~/const/data";
import { Link, useLocation } from "react-router-dom";
function HomeConnections() {
    const cx = classNames.bind(styles);
    const location = useLocation();
    return ( 
        <div className={cx('wrapper','p-4')}>
            <div className={cx('wrapper__header','flex items-center justify-between')}>
                <h1>Bạn bè</h1>
                <FontAwesomeIcon className={cx('wrapper__header-icon')} icon={faGear}/>
            </div>
            <ul className={cx('wrapper__list')}>
                {
                    DATA_CONNECTIONS.map((item) => {
                        return (
                            <li key={item.id} className={cx('', item.path === location.pathname ? 'wrapper__list-itemSelected' : '')}>
                                <Link className={cx('flex items-center justify-between')} to={item.path}>
                                    <div className={cx('flex items-center','wrapper__list-name')}>
                                        <FontAwesomeIcon className={cx('wrapper__list-itemIcon',item.path === location.pathname ? 'wrapper__list-itemIconSelected' : '')} icon={item.image}/>
                                        {item.name}
                                    </div>
                                    {
                                        item.path !== location.pathname ? (
                                            <FontAwesomeIcon className={cx('wrapper__list-icon')} icon={faChevronRight}/>
                                        ) : ''
                                    }
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
}

export default HomeConnections;