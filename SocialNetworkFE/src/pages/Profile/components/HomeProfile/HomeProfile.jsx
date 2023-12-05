import classNames from "classnames/bind";
import styles from "./HomeProfile.module.scss";
import Post from "~/components/Post/Post";
import { DATA__PERSONAL__INFORMATION as personalInfo } from "~/const/data";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {Button as ButtonEdit} from "~/components/button/button";
import { Link } from "react-router-dom";
import CreatePost from "~/components/form/CreatePost/CreatePost";
import { useEffect, useState} from "react";
import useUserToken from "~/hook/user";
import { useSelector } from "react-redux";
import Loader from "~/components/loader/loader";
import usePosts from "~/hook/post";
import BoxPostModal from "~/components/Popper/BoxPost";
import CreatePostWrapper from "~/components/Popper/CreatePostWrapper";
function HomeProfile() {
    const cx = classNames.bind(styles);
    const [valueMessageGetList,setValueMessageGetList] = useState('');
    const {listMediaToUser,listUserFriends,valueIdUser,getListMediaToUser,getListFriendsToUser} = useUserToken();
    const {handleGetListPostByUserId,listPostsByUserId} = usePosts();
    const [isShowCreatePost,setIsShowCreatePost] = useState(false);
    const state = useSelector(state => state.post);
    const [isShowBoxPost,setIsShowBoxPost] = useState({});

    useEffect(() => {
        if(valueIdUser !== undefined){
            getListMediaToUser(6);
            getListFriendsToUser(50);
            handleGetListPostByUserId(valueIdUser);
        }
    },[valueIdUser]);

    useEffect(() => {
        if(state.msg === "No data"){
            setValueMessageGetList(state.msg);
        } else {
            setValueMessageGetList("");
        }
    },[state.msg]);

    return (  
        <div className={cx('wrapper','flex')} >
            <div className={cx('wrapper__left','w-2/6')}>
                <div className={cx('wrapper__left-info','bg-sidebar mt-5 text-white')}>
                    <span className={cx('wrapper__left-info-title')}>Giới thiệu</span>
                    <div className={cx('wrapper__left-info-introduce','text-center')}>
                        <div className={cx('wrapper__left-info-introduce-des')}>yen</div>
                        <ButtonEdit type="button" content="Chỉnh sữa tiểu sử"/>
                    </div>
                    <ul className={cx('wrapper__left-info-list')}>    
                        <li>
                            {
                                personalInfo.university && personalInfo.university.status === 'Đang học' ? 
                                (
                                    <div>
                                        <FontAwesomeIcon className={cx('wrapper__left-info-list-itemIcon')}  icon={personalInfo.university.icon}/>
                                        <span className="pl-5">Học tại {personalInfo.university.name}</span>
                                    </div>
                                ) : (
                                    <div>
                                        <FontAwesomeIcon className={cx('wrapper__left-info-list-itemIcon')} icon={personalInfo.university.icon}/>
                                        <span className="pl-5">Đã học tại {personalInfo.university.name}</span>
                                    </div>
                                )
                            }
                        </li>
                        <li>
                            {
                                 personalInfo.hightSchool && personalInfo.hightSchool.status === 'Đã từng' ? 
                                (
                                    <div>
                                        <FontAwesomeIcon className={cx('wrapper__left-info-list-itemIcon')} icon={personalInfo.hightSchool.icon}/>
                                        <span className="pl-5">Đã học tại {personalInfo.hightSchool.name}</span>
                                    </div>
                                ) : (
                                    <div>
                                        <FontAwesomeIcon className={cx('wrapper__left-info-list-itemIcon')} icon={personalInfo.hightSchool.icon}/>
                                        <span className="pl-5">Học tại {personalInfo.hightSchool.name}</span>
                                    </div>
                                )
                            }
                        </li>
                        <li>
                            {
                                personalInfo.from && personalInfo.from.name !== '' ? 
                                (
                                    <div>
                                        <FontAwesomeIcon className={cx('wrapper__left-info-list-itemIcon')} icon={personalInfo.from.icon}/>
                                        <span className="pl-5">Sống tại {personalInfo.from.name}</span>
                                    </div>
                                ) : ''
                            }
                        </li>
                        <li>
                            {
                                personalInfo.liveAt && personalInfo.liveAt.name !== '' ? 
                                (
                                    <div>
                                        <FontAwesomeIcon className={cx('wrapper__left-info-list-itemIcon')} icon={personalInfo.liveAt.icon}/>
                                        <span className="pl-5">Đến từ {personalInfo.liveAt.name}</span>
                                    </div>
                                ) : ''
                            }
                        </li>
                        <li>
                            {
                                personalInfo.matrimony && personalInfo.matrimony.name === 'Hẹn hò' ? 
                                (
                                    <div>
                                        <FontAwesomeIcon className={cx('wrapper__left-info-list-itemIcon')} icon={faHeart}/>
                                        <span className="pl-5">{personalInfo.matrimony.name}</span>
                                    </div>
                                ) : ''
                            }
                        </li>
                    </ul>
                    <ButtonEdit type="button" content="Chỉnh sữa tiểu sử"/>
                    <ButtonEdit type="button" className="mt-5" content="Thêm sở thích"/>
                </div>
                <div className={cx('wrapper__left-imagesUser','bg-sidebar mt-5 text-white')}>
                    <div className={cx('flex items-center justify-between')}>
                        <span className={cx('wrapper__left-imagesUser-title')}>Ảnh</span>
                        <Link to='/profile/photos'>Xem tất cả ảnh</Link>
                    </div>
                    <div className={cx('wrapper__left-imagesUser-list','mt-5')}>
                        {
                            listMediaToUser.length > 0 ? (
                                <div className={cx("grid grid-cols-3 gap-3",listMediaToUser.length === 6 ? 'grid-rows-3' : '')}>
                                    {
                                        listMediaToUser.map((item,index) =>{
                                            return <img key={index} className={cx('w-40 h-40 object-cover')} src={item.mediaUrl} alt="all media"/>
                                        })
                                    }
                                </div>
                            ) : <h3>Bạn chưa có hình ảnh/video</h3>
                        }    
                    </div>
                </div>
                <div className={cx('wrapper__left-friendsUser','bg-sidebar mt-5 text-white')}>
                    <div className={cx('flex items-center justify-between')}>
                        <span className={cx('wrapper__left-friendsUser-title')}>Bạn bè</span>
                        <Link to='/profile/photos'>Xem tất cả bạn bè</Link>
                    </div>
                    <div className={cx('wrapper__left-friendsUser-quantityFriends','text-color-text')}>269 bạn bè</div>
                    <div className={cx('wrapper__left-friendsUser-list','mt-5')}>
                        <div className={cx("grid grid-cols-3 gap-3",listUserFriends.length === 6 ? 'grid-rows-3' : '')}>
                            {
                                listUserFriends.length > 0 && listUserFriends.map((item,index) =>{
                                    return (
                                        <div key={index}>
                                            <img key={index} className={cx('w-40 h-40 object-cover')} src={item.image} alt="all friends"/>
                                            <div className={cx('w-full','wrapper__left-friendsUser-list-itemName')}>{item.firstName + " " + item.lastName}</div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper__right','w-4/6')}>
                <div className={cx('wrapper__right-createPost','bg-sidebar')}>
                    <CreatePost onShow={(e) => setIsShowCreatePost(e)}/>
                </div>
                <div>
                    {
                        valueMessageGetList === "No data" ?
                            <h1>Chưa có bài viết nào</h1>
                            : (listPostsByUserId.length > 0 ? listPostsByUserId.map((item) => {
                                return (
                                    <div key={item.id} className="mt-6">
                                        <Post onShowBox={(e) => setIsShowBoxPost(e)}  data={item}/>
                                    </div>
                                )
                            }) : <div className="mt-8"><Loader/></div>)
                    }
                </div>
                {/* SHOW CREATE BOX  */}
                {isShowCreatePost ? <CreatePostWrapper closeIsShow={(e) => setIsShowCreatePost(e)} isShow={isShowCreatePost} onShow={(e) => setIsShowCreatePost(e)}/> : ''}
                {/* SHOW BOX POST */}
                { isShowBoxPost ? <BoxPostModal closeIsShow={(e) => setIsShowBoxPost(e)} data={isShowBoxPost}/> : ""}
            </div>
        </div>
    );
}

export default HomeProfile;