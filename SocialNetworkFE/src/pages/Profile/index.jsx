import classNames from "classnames/bind";
import styles from "./Profile.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPen, faUser, faUserGroup } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { DATA_MENU_CHILDREN_PROFILE } from "~/const/data";
import useUserToken from "~/hook/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetailUserById } from "~/redux/authSlice";
import { checkStatusFriends } from "~/redux/friendSlice";
function Profile({children}) {
    const cx = classNames.bind(styles);
    const [valueObDetailUser,setValueObDetailUser] = useState({});
    const location = useLocation();
    const dispatch = useDispatch();
    const {updateImageUser,valueIdUser} = useUserToken();
    const [valueCheckStatusUser,setCheckStatusUser] = useState('');
    //
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');

    //
    const state = useSelector(state => state.auth);
    const stateFriends = useSelector(state => state.friends);

    //
    const handleOnChangeImageUpLoad = (e) => {
        updateImageUser(e.target.files[0]);
    } 

    //
    const handleDispatch = (id,currentId) => {
        if (id && currentId !== undefined && id !== currentId) {
            dispatch(getDetailUserById({ id }));
            dispatch(checkStatusFriends({
              current: currentId,
              other: id
            }));
        }
    }

    //
    useEffect(() => {
        console.log(id);
        handleDispatch(id,valueIdUser);
    }, [id, valueIdUser]);
      
    
    //
    useEffect(() => {
        const isObDetailNotEmpty = state?.obDetail && Object.keys(state.obDetail).length > 0;
        if (isObDetailNotEmpty) {
            setValueObDetailUser(state.obDetail);
        }
    }, [state]);

    useEffect(() => {
        if (stateFriends?.msg !== '') {
            console.log(stateFriends?.msg);
            setCheckStatusUser(stateFriends?.msg);
        }
    }, [stateFriends]);

    useEffect(() => {
        dispatch(getDetailUserById({ id }));
    },[]);

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
                        <img className={cx('wrapper__detail-info-chooseImg-img')} src={valueObDetailUser.image} alt="Choose User"/>
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
                                <h1 className={cx('wrapper__detail-info-box-name')}>{valueObDetailUser?.firstName !== '' && valueObDetailUser?.lastName !== '' ? valueObDetailUser.firstName + " " + valueObDetailUser.lastName : ''}</h1>
                                <span className={cx('wrapper__detail-info-box-quantityFriends','text-color-text')}>269 bạn bè</span>
                            </div>
                        </div>
                        <div className={cx('wrapper__detail-info-box-menu')}>
                            {
                                (valueObDetailUser?.id === valueIdUser && (
                                    <Link to='/settings' className={cx('wrapper__detail-info-box-editInfo', 'flex items-center')}>
                                        <FontAwesomeIcon icon={faPen} />
                                        <button className={cx('pl-2')} type="button">Chỉnh sữa thông tin</button>
                                    </Link>
                                )) ||
                                (valueCheckStatusUser && (
                                    <div className={cx('py-2 px-4 rounded-lg text-xl bg-primaryColor text-white font-medium flex items-center')}>
                                        <div>
                                            <FontAwesomeIcon icon={faUserGroup} />
                                        </div>
                                        <button className={cx('pl-2')} type="button">
                                            {valueCheckStatusUser === 'Bạn bè' && 'Bạn bè'}
                                            {valueCheckStatusUser === 'Đã gửi yêu cầu kết bạn' && 'Đã gửi yêu cầu kết bạn'}
                                        </button>
                                    </div>
                                )) ||
                                (
                                    <div className={cx('py-2 px-4 rounded-lg text-xl bg-primaryColor text-white font-medium flex items-center')}>
                                        <div>
                                            <FontAwesomeIcon icon={faUserGroup} />
                                        </div>
                                        <button className={cx('pl-2')} type="button">Thêm bạn bè</button>
                                    </div>
                                )
                            }
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
                                        to={`${item.path}?id=${id}`}
                                    >
                                        {item.name}
                                    </Link>
                                )
                            })
                        }
                    </div>
                    
                </div>
            </div>
            {children}
        </div>
    );
}

export default Profile;