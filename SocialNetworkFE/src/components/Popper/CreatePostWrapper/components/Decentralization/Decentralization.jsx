import classNames from "classnames/bind";
import styles from "./Decentralization.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft, faEarthAmericas, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
function BoxDecentralization({forwardTo=undefined,onConfirm=undefined}) {
    const cx = classNames.bind(styles);
    const [isCheckedDecentralization,setIsCheckedDecentralization] = useState('');

    const handleClickCheckedPublic = () => {
        setIsCheckedDecentralization('public');
    };
    const handleClickCheckedPrivate = () => {
        setIsCheckedDecentralization('private');
    };
    const handleClickCheckedFriends = () => {
        setIsCheckedDecentralization('friends');
    };
    
    const handleClickConfirmDecentralization = () => {
        if(isCheckedDecentralization !== ''){
            onConfirm({
                state : false,
                decentralization : isCheckedDecentralization
            });
        }
    };
    return (  
        <div className={cx('wrapper__container','relative')}>
            <div className={cx('animation')}>
                <div className={cx('wrapper__container-header','flex items-center relative justify-center py-8')}>
                    <FontAwesomeIcon
                        className={cx('wrapper__container-header-icon')}
                        icon={faArrowCircleLeft}
                        onClick={() => forwardTo(true)}
                    />
                    <h1>Đối tượng của bài viết</h1>
                </div>
                <div className={cx('wrapper__container-content','p-5')}>
                    <div className={cx('wrapper__container-content-header')}>
                        <h1>Ai có thể xem bài viết của bạn?</h1>
                        <p>
                            <span>Bài viết của bạn sẽ hiển thị ở Bảng feed, trang cá nhân và kết quả tìm kiếm.</span>
                            <br></br>
                            <span>Tuy đối tượng mặc định là <span className={cx('font-semibold')}>Công Khai</span>, nhưng bạn có thể thay đổi đối tượng của riêng bài viết này.</span>
                        </p>
                    </div>
                    <div 
                        className={cx('wrapper__container-content-public',isCheckedDecentralization === 'public' ? 'wrapper__container-content-checked' : '')} 
                        onClick={handleClickCheckedPublic}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faEarthAmericas}/>
                                <div className="ml-4">
                                    <h1>Công khai</h1>
                                    <p className="text-lg font-medium">Bất kỳ ai ở trên hoặc ngoài</p>
                                </div>
                            </div>
                            <input type="radio" readOnly checked={isCheckedDecentralization === 'public' ? true : false} />
                        </div>
                    </div>
                    <div 
                        className={cx('wrapper__container-content-private',isCheckedDecentralization === 'private' ? 'wrapper__container-content-checked' : '')} 
                        onClick={handleClickCheckedPrivate}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faUser}/>
                                <div className="ml-4">
                                    <h1>Chỉ mình tôi</h1>
                                    <p className="text-lg font-medium">Bất kỳ ai ở trên hoặc ngoài</p>
                                </div>
                            </div>
                            <input type="radio" readOnly checked={isCheckedDecentralization === 'private' ? true : false} />
                        </div>
                    </div>
                    <div 
                        className={cx('wrapper__container-content-friends',isCheckedDecentralization === 'friends' ? 'wrapper__container-content-checked' : '')}  
                        onClick={handleClickCheckedFriends}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <FontAwesomeIcon icon={faUserGroup}/>
                                <div className="ml-4">
                                    <h1>Bạn bè</h1>
                                    <p className="text-lg font-medium">Chỉ bạn bè trên SGU</p>
                                </div>
                            </div>
                            <input type="radio" readOnly checked={isCheckedDecentralization === 'friends' ? true : false}/>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper__container-footer','flex items-center justify-end')}>
                    <button 
                        className={cx('wrapper__container-footer-btnCancel','mr-4')} 
                        type="button" 
                        onClick={() => forwardTo(true)}
                    >
                        Hủy
                    </button>
                    <button 
                        className={cx('wrapper__container-footer-btnConfirm','mr-4')} 
                        type="button"
                        onClick={handleClickConfirmDecentralization}
                    >
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BoxDecentralization;