import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import { Wrapper } from "~/components/Popper";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { DATA_MENU_CHILDREN_PROFILE } from "~/const/data";
function Profile({children}) {
    const cx = classNames.bind(styles);
    const location = useLocation();

    return ( 
        <div className={cx('wrapper','w-full h-full')}>
            <div className={cx('wrapper__BgUser','bg-sidebar')}>
                <img className={cx('w-full')} src={images.bgUser} alt="Background User" />
                <input id="img" className={cx('wrapper__BgUser-uploadImg')} type="file" placeholder="Thêm ảnh bìa"/>
                <div className={cx('wrapper__BgUser-chooseImg','flex items-center')}>
                    <FontAwesomeIcon className="" icon={faCamera}/>
                    <label className="pl-5" htmlFor="img">Thêm ảnh bìa</label>
                </div>
            </div>
            <div className={cx('wrapper__detail','bg-sidebar')}>
                <div className={cx('wrapper__detail-info','')}>
                    <img className={cx('')} src={images.user} alt="Choose User"/>
                    <div className={cx('wrapper__detail-info-box','flex items-center justify-between')}>
                        <div className={cx('','flex items-center ')}>
                            <div className={cx('text-white pl-5')}>
                                <h1 className={cx('wrapper__detail-info-box-name')}>Nguyen Ngoc Dinh</h1>
                                <span className={cx('wrapper__detail-info-box-quantityFriends','text-color-text')}>269 bạn bè</span>
                            </div>
                        </div>
                        <div className={cx('wrapper__detail-info-box-menu')}>
                            {/* <div className={cx('wrapper__detail-info-box-addStory','flex items-center mb-3 bg-primaryColor text-white')}>
                                <FontAwesomeIcon icon={faPlus}/>
                                <button className={cx('pl-2')} type="button">Thêm vào tin</button>
                            </div> */}
                            <Link to='/settings' className={cx('wrapper__detail-info-box-editInfo','flex items-center')}>
                                <FontAwesomeIcon icon={faPen}/>
                                <button className={cx('pl-2')} type="button">Chỉnh sữa thông tin</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper__detail-content','')}>
                    <div className={cx('wrapper__detail-content-list','text-color-text ')}>
                        {
                            DATA_MENU_CHILDREN_PROFILE.map((item,index) => {
                                return (
                                    <Link 
                                        className={cx(location.pathname === item.path ? 'wrapper__detail-content-list-itemSelected' : '')} 
                                        key={index} 
                                        to={item.path}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div>
            <div>
                {children}
            </div>
        </div>
    );
}

export default Profile;