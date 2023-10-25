import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { DATA_MENU_CHILDREN_PROFILE } from "~/const/data";
import { useEffect, useState } from "react";
import { storage } from "~/config/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';
import { useDispatch, useSelector } from "react-redux";
import { getInfoUserByToken, updateImageUserDB} from "~/redux/authSlice";
function Profile({children}) {
    const cx = classNames.bind(styles);
    const [nameUrlImageUser,setNameUrlImageUser] = useState('');
    const dispatch = useDispatch();
    const location = useLocation();

    const state = useSelector(state => state.auth);

    const handleOnChangeImageUpLoad = (e) => {
        const imageUpload = e.target.files[0];
        if(imageUpload !== null){
            const uuid = v4();
            const nameImage = imageUpload.name+ uuid;
            const imageRef = ref(storage,`images/${nameImage}`);
            uploadBytes(imageRef,imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    dispatch(updateImageUserDB({
                        image : url,
                        id: state.user.id
                    }));
                    setNameUrlImageUser(url);
                })
            })
        }
    } 
 
    //
    useEffect(() => {
        const tokenUser = localStorage.getItem('token');
        if(tokenUser !== null) {
            dispatch(getInfoUserByToken(tokenUser)).then((item) => {
                setNameUrlImageUser(item.payload.image);
            });
        }
    },[dispatch]);

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
                <div className={cx('wrapper__detail-info','flex')}>
                    <div className={cx('wrapper__detail-info-chooseImg')}>
                        <img className={cx('wrapper__detail-info-chooseImg-img')} src={nameUrlImageUser} alt="Choose User"/>
                        <input onChange={(e) => handleOnChangeImageUpLoad(e)} type="file" id="ip-chooseFile" className="hidden"></input>
                        <label htmlFor="ip-chooseFile">
                            <FontAwesomeIcon 
                                className={cx('wrapper__detail-info-chooseImg-icon')}  
                                icon={faCamera}
                            />
                        </label>
                    </div>
                    <div className={cx('wrapper__detail-info-box','flex items-center justify-between')}>
                        <div className={cx('','flex items-center ')}>
                            <div className={cx('text-white pl-5')}>
                                <h1 className={cx('wrapper__detail-info-box-name')}>Nguyen Thanh Quynh Linh</h1>
                                <span className={cx('wrapper__detail-info-box-quantityFriends','text-color-text')}>269 bạn bè</span>
                            </div>
                        </div>
                        <div className={cx('wrapper__detail-info-box-menu')}>
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