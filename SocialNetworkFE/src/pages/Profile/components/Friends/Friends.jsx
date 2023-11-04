import classNames from "classnames/bind";
import styles from "./Friends.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState , useEffect } from "react";
import useUserToken from "~/hook/user";
import { useDispatch } from "react-redux";
import { getListUserFriends } from "~/redux/authSlice";
import { DATA_MENU_FRIENDS_PROFILE } from "~/const/data";
function FriendsProfile() {
    const cx = classNames.bind(styles);
    const [listUserFriends,setListUserFriends] = useState([]);
    const [valueMenu,setValueMenu] = useState('AllFriends');
    const {valueIdUser} = useUserToken();
    const dispatch = useDispatch();
    useEffect(() => {
        if(valueIdUser !== undefined){
            dispatch(getListUserFriends({id : valueIdUser , limit : 50})).then((item) => {
                const newArr = item.payload ? item.payload : [];
                setListUserFriends(newArr);
            })
        }
    },[valueIdUser])
    return ( 
        <div className={cx('wrapper','w-full h-full')}>
            <div className="bg-sidebar my-10 p-8 rounded-lg">
                <div className={cx('wrapper__header','flex items-center justify-between')}>
                    <h1>Bạn bè</h1>
                    <div className={cx('flex items-center justify-between')}>
                        <div>
                            <div className="relative mt-2 rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-3">
                                <span className="text-gray-500 sm:text-sm"><FontAwesomeIcon className={cx('wrapper__header-iconSearch')} icon={faSearch}/></span>
                                </div>
                                <input type="text" name="search" id="search" className={cx('wrapper__header-search',"block w-full rounded-md")} placeholder="Tìm kiếm"/>
                                <div className="absolute inset-y-0 right-0 flex items-center">
                                </div>
                            </div>
                        </div>
                        <Link className="text-primaryColor font-semibold mx-10" to={'/friends/requests'}>Lời mời kết bạn</Link>
                        <Link className="text-primaryColor font-semibold mx-10" to={'/friends/suggestions'}>Tìm bạn bè</Link>
                        <FontAwesomeIcon className={cx('wrapper__header-iconVertical')} icon={faEllipsisVertical}/>
                    </div>
                </div>
                <div className={cx('wrapper__content')}>
                    <ul className='flex items-center justify-between'>
                        {
                            DATA_MENU_FRIENDS_PROFILE.map((item,index) => {
                                return <li className={cx(valueMenu === item.type ?'wrapper__content-menuItem' : '','p-4')} key={index}>{item.name}</li>
                            })
                        }
                    </ul>
                    <div className={cx('wrapper__content-listFriends','grid grid-cols-2 gap-2 mt-4')}>
                        {
                            listUserFriends.length > 0 && (
                                listUserFriends.map((item,index) => {
                                    return (
                                        <div key={index} className={cx('wrapper__content-listFriends-item','flex items-center justify-between p-5')}>
                                            <div className={cx('flex items-center')}>
                                                <img className={cx('w-40 h-w-40')} src={item.image} alt={item.lastName}/>
                                                <div className="ml-4">
                                                    <h1>{item.firstName+" "+item.lastName}</h1>
                                                    <span>9 bạn chung</span>
                                                </div>
                                            </div>
                                            <FontAwesomeIcon className={cx('wrapper__content-listFriends-item-icon')} icon={faEllipsisVertical}/>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FriendsProfile;