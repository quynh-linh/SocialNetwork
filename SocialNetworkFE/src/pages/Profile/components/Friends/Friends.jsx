import classNames from "classnames/bind";
import styles from "./Friends.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useLocation , Link } from "react-router-dom";
import { useState , useEffect } from "react";
import useUserToken from "~/hook/user";
import { DATA_MENU_FRIENDS_PROFILE } from "~/const/data";
import Loader from "~/components/loader/loader";
function FriendsProfile() {
    const cx = classNames.bind(styles);
    const [valueMenu,setValueMenu] = useState('AllFriends');
    const {listUserFriends , getListFriendsToUser,isLoadingGetListUserFriends} = useUserToken();
    //
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');
    //
    useEffect(() => { 
        if (id !== null) {
            getListFriendsToUser(id,50);
        }
    },[id])
    return ( 
        <div className={cx('wrapper','w-full h-full')}>
            <div className="bg-sidebar my-10 p-8 rounded-lg">
                <div className={cx('wrapper__header','flex items-center justify-between')}>
                    <h1 className="text-2xl text-color-text">Bạn bè</h1>
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
                        <div className="flex items-center">
                            <Link className="text-primaryColor text-xl font-semibold mx-5" to={'/friends/requests'}>Lời mời kết bạn</Link>
                            <Link className="text-primaryColor text-xl font-semibold mx-5" to={'/friends/suggestions'}>Tìm bạn bè</Link>
                            <FontAwesomeIcon className="ml-4 px-6 py-2 bg-background text-color-text rounded-xl font-semibold" icon={faEllipsisVertical}/>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper__content')}>
                    <ul className='flex items-center justify-between'>
                        {
                            DATA_MENU_FRIENDS_PROFILE.map((item,index) => {
                                return (
                                    <li 
                                        className={cx(valueMenu === item.type ?'wrapper__content-menuItem' : '','p-4')} 
                                        key={index}
                                    >
                                        {item.name}
                                    </li>
                                )
                            })
                        }
                    </ul>
                    {
                        isLoadingGetListUserFriends ? <Loader/> : (
                            (listUserFriends.length > 0 ? (
                                <div className={cx('wrapper__content-listFriends','grid grid-cols-2 gap-2 mt-4')}>
                                    {
                                        listUserFriends.map((item,index) => {
                                            return (
                                                <div key={index} className={cx('wrapper__content-listFriends-item','flex items-center justify-between p-5')}>
                                                    <div className={cx('flex items-center')}>
                                                        <img className={cx('w-40 h-40')} src={item.image} alt={item.lastName}/>
                                                        <div className="ml-4">
                                                            <h1 className="text-2xl">{item.firstName+" "+item.lastName}</h1>
                                                            <span className="text-xl">9 bạn chung</span>
                                                        </div>
                                                    </div>
                                                    <FontAwesomeIcon className={cx('wrapper__content-listFriends-item-icon')} icon={faEllipsisVertical}/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <div className="text-center text-color-text font-semibold py-6">
                                    <h3>Bạn chưa có hình ảnh/video</h3>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default FriendsProfile;