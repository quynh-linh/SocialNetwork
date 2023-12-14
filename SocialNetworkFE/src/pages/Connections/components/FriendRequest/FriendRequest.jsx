import classNames from "classnames/bind";
import styles from "./FriendRequest.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faIdBadge } from "@fortawesome/free-solid-svg-icons";
import Profile from "~/pages/Profile";
function FriendRequest() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper','w-full h-full flex items-center text-center justify-center')}>
            <div>
                <FontAwesomeIcon className={cx('wrapper__icon')} icon={faIdBadge}/>
                <h1 className="mt-8"> Chọn người mà bạn muốn xem trang cá nhân</h1>
            </div>
            {/* <Profile/> */}
        </div>
    );
}

export default FriendRequest;