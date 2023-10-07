import classNames from "classnames/bind";
import styles from "./AddFriends.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
function AddFriends({data}) {
    const cx = classNames.bind(styles);
    return ( 
        <div className={cx('wrapper','flex items-center justify-between')}>
            <div className={cx('wrapper-boxImg')}><img src={images.user} alt="Add user" className={cx('w-16 h-16','wrapper-img')}/></div>
            <div className={cx('wrapper-title')}>
                <div className={cx('wrapper-name')}>{data.name}</div>
                <div className={cx('wrapper-mutualFriends')}>{data.mutual} bạn bè chung</div>
            </div>
            <div className={cx('wrapper-icon')}>
                {
                    data.accept ? (
                        data.accept === 'True' 
                        ?  <FontAwesomeIcon className={cx('wrapper-add')} icon={faUserCheck}/>  
                        :  <FontAwesomeIcon className={cx('wrapper-Check')} icon={faPlus}/>  
                    ) : <FontAwesomeIcon className={cx('wrapper-add')} icon={faPlus}/>  
                }
            </div>
        </div>
    );
}

export default AddFriends;