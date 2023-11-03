import classNames from "classnames/bind";
import styles from "./Connections.module.scss"
import RequestFriends from "~/components/form/Request/Request";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useDispatch} from "react-redux";
import { getListSuggestedFriends, getListUserVerifyRequest } from "~/redux/authSlice";
import useUserToken from "~/hook/user";
function Connections() {
    const cx = classNames.bind(styles);
    const [valueQuantityShowMoreRequestSent,setValueQuantityShowMoreRequestSent] = useState(8);
    const [valueQuantityShowMoreSuggestionsFriends,setValueQuantityShowMoreSuggestionsFriends] = useState(8);
    const [isShowSeeMoreRequestFriends,setIsShowSeeMoreRequestFriends] = useState(true);
    const [isShowSeeMoreSuggestionsFriends,setIsShowSeeMoreSuggestionsFriends] = useState(true);
    const [listDataRequestFriends,setListDataRequestFriends] = useState([]);
    const [listDataSuggestionsFriends,setListDataSuggestionsFriends] = useState([]);
    
    const {valueIdUser} = useUserToken();
    const dispatch = useDispatch();

    const handleClickShowMoreRequestSent = () => {
        setValueQuantityShowMoreRequestSent(valueQuantityShowMoreRequestSent + 4);
        if(valueQuantityShowMoreRequestSent >= listDataRequestFriends.length){
            setIsShowSeeMoreRequestFriends(false);
        } else {
            setIsShowSeeMoreRequestFriends(true);
        }
    };

    const handleClickShowMoreSuggestionsFriends = () => {
        setValueQuantityShowMoreSuggestionsFriends(valueQuantityShowMoreSuggestionsFriends + 4);
        if(valueQuantityShowMoreSuggestionsFriends >= listDataSuggestionsFriends.length){
            setIsShowSeeMoreSuggestionsFriends(false);
        } else {
            setIsShowSeeMoreSuggestionsFriends(true);
        }
    };

    // HANDLE
    useEffect(() => {
        if(valueIdUser !== undefined){
            // GET LIST USER VERIFY REQUEST
            dispatch(getListUserVerifyRequest({id : valueIdUser , limit : valueQuantityShowMoreRequestSent})).then((item) => {
                if(item !== null){
                    const listDB = item.payload ? item.payload : [];
                    if(valueQuantityShowMoreRequestSent > listDB.length){
                        setIsShowSeeMoreRequestFriends(false);
                    } else if(valueQuantityShowMoreRequestSent === listDB.length){
                        setIsShowSeeMoreRequestFriends(true);
                    }
                    if(listDB !== null){
                        setListDataRequestFriends(listDB);
                    }
                }  
            });
            // GET LIST SUGGESTED FRIENDS
            dispatch(getListSuggestedFriends({id : valueIdUser , limit : valueQuantityShowMoreSuggestionsFriends})).then((item) => {
                if(item !== null){
                    const listDB = item.payload ? item.payload : [];
                    if(valueQuantityShowMoreSuggestionsFriends > listDB.length){
                        setIsShowSeeMoreSuggestionsFriends(false);
                    } else if(valueQuantityShowMoreSuggestionsFriends === listDB.length){
                        setIsShowSeeMoreSuggestionsFriends(true);
                    }
                    if(listDB !== null){
                        setListDataSuggestionsFriends(listDB);
                    }
                }  
            });
        }
    },[dispatch,valueQuantityShowMoreRequestSent,valueQuantityShowMoreSuggestionsFriends,valueIdUser]);
    return ( 
        <div className={cx('wrapper')}>
            {
                listDataRequestFriends.length > 0 ? (
                    <div className={cx('wrapper__FriendsRequest')}>
                        <div className={cx('wrapper__header','flex items-center justify-between')}>
                            <h1>Lời mời kết bạn</h1>
                            <Link to=''>
                                Xem tất cả
                            </Link>
                        </div>
                        <div className={cx("grid grid-cols-4 gap-4")}>
                            {
                                listDataRequestFriends.map((item,index) => {
                                    return (
                                        <RequestFriends 
                                            key={index} 
                                            data={item}
                                            senderId={valueIdUser}
                                            type='request'
                                        />
                                    ) 
                                })
                            }
                        </div>
                        {
                            isShowSeeMoreRequestFriends ? (
                                <div className={cx('wrapper__seeMore','flex items-center justify-center')}>
                                    <h1 onClick={handleClickShowMoreRequestSent}>Xem thêm</h1>
                                    <FontAwesomeIcon className={cx('ml-2')} icon={faChevronDown}/>
                                </div>
                            ) : ''
                        }
                    </div>
                ) : ''
            }
           {
                listDataSuggestionsFriends.length > 0 ? (
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
                            isShowSeeMoreSuggestionsFriends ? (
                                <div className={cx('wrapper__seeMore','flex items-center justify-center')}>
                                    <h1 onClick={handleClickShowMoreSuggestionsFriends}>Xem thêm</h1>
                                    <FontAwesomeIcon className={cx('ml-2')} icon={faChevronDown}/>
                                </div>
                            ) : ''
                        }
                    </div>
                ) : ''
           }
        </div>
    );
}

export default Connections;