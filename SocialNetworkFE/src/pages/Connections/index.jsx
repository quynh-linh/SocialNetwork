import classNames from "classnames/bind";
import styles from "./Connections.module.scss"
import RequestFriends from "~/components/form/Request/Request";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch} from "react-redux";
import { getListSuggestedFriends, getUserRequestFriends } from "~/redux/authSlice";
import useUserToken from "~/hook/user";
function Connections() {
    const cx = classNames.bind(styles);
    const [valueQuantityMore,setValueQuantityMore] = useState(8);
    const [isShowSeeMoreRequestFriends,setIsShowSeeMoreRequestFriends] = useState(true);
    const [listDataRequestFriends,setListDataRequestFriends] = useState([]);
    const [listDataSuggestionsFriends,setListDataSuggestionsFriends] = useState([]);
    
    const {valueIdUser} = useUserToken();
    const dispatch = useDispatch();

    const handleClickSeeMore = () => {
        setValueQuantityMore(valueQuantityMore + 4);
        if(valueQuantityMore >= listDataRequestFriends.length){
            setIsShowSeeMoreRequestFriends(false);
        } else {
            setIsShowSeeMoreRequestFriends(true);
        }
    };

    // HANDLE
    useEffect(() => {
        if(valueIdUser !== undefined){
            // GET LIST USER REQUEST FRIENDS
            dispatch(getUserRequestFriends({id : valueIdUser , limit : valueQuantityMore})).then((item) => {
                if(item !== null){
                    const listDB = item.payload ? item.payload : [];
                    if(listDB !== null){
                        setListDataRequestFriends(listDB);
                    }
                }  
            });
            // GET LIST SUGGESTED FRIENDS
            dispatch(getListSuggestedFriends({id : valueIdUser})).then((items) => {
                setListDataSuggestionsFriends(items.payload);
            });
        }
    },[dispatch,valueQuantityMore,valueIdUser]);

    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__FriendsRequest')}>
                <div className={cx('wrapper__header','flex items-center justify-between')}>
                    <h1>Lời mời kết bạn</h1>
                    <Link to=''>
                        Xem tất cả
                    </Link>
                </div>
                <div className={cx("grid grid-cols-4 gap-4")}>
                    {
                        listDataRequestFriends.length > 0 ? (
                            listDataRequestFriends.map((item,index) => {
                                if(item.status === '1') {
                                    return (
                                        <RequestFriends 
                                            key={index} 
                                            data={item}
                                            senderId={valueIdUser}
                                            type='request'
                                        />
                                    ) 
                                } else {
                                    return ''
                                }
                            })
                        ) : ''
                    }
                </div>
                {
                    isShowSeeMoreRequestFriends ? (
                        <div className={cx('wrapper__seeMore','flex items-center justify-center')}>
                            <h1 onClick={handleClickSeeMore}>Xem thêm</h1>
                            <FontAwesomeIcon className={cx('ml-2')} icon={faChevronDown}/>
                        </div>
                    ) : ''
                }
            </div>
            <div className={cx('wrapper__friendsSuggestions','mt-3')}>
                <div className={cx('wrapper__header','flex items-center justify-between')}>
                    <h1>Những người bạn có thể biết</h1>
                    <Link to=''>
                        Xem tất cả
                    </Link>
                </div>
                <div className={cx("grid grid-cols-4 gap-4")}>
                    {
                        listDataSuggestionsFriends.length > 0 ? (
                            listDataSuggestionsFriends.map((item,index) => {
                                return (
                                    <RequestFriends 
                                        key={index} 
                                        data={item}
                                        senderId={valueIdUser}
                                        type='suggestions'
                                    />
                                ) 
                            })
                        ) : ''
                    }
                </div>
                {
                    isShowSeeMoreRequestFriends ? (
                        <div className={cx('wrapper__seeMore','flex items-center justify-center')}>
                            <h1 onClick={handleClickSeeMore}>Xem thêm</h1>
                            <FontAwesomeIcon className={cx('ml-2')} icon={faChevronDown}/>
                        </div>
                    ) : ''
                }
            </div>
        </div>
    );
}

export default Connections;