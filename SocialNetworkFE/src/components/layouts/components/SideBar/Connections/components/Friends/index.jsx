import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SimpleBarReact from "simplebar-react";
import { getListUserVerifyRequest} from "~/redux/authSlice";
import AddFriends from "~/components/form/AddFriends/AddFriends";
import styles from "./Friends.module.scss";
import 'simplebar-react/dist/simplebar.min.css';
import useUserToken from "~/hook/user";

function FriendsConnections({type='',title='',onShow=undefined}) {
    const cx = classNames.bind(styles);
    const [listDataRequestFriends, setListDataRequestFriends] = useState([]);
    const [valueScrollInnerHeight,setValueScrollInnerHeight] = useState(0);
    const dispatch = useDispatch();
    const {valueIdUser} = useUserToken();

    const handleShowRequestSent = () =>{
        onShow(true);
    }

    useEffect(() => {    
        if(type === 'request') { 
            if(valueIdUser){
                dispatch(getListUserVerifyRequest({id : valueIdUser , limit : 1000})).then((item) => {
                    setListDataRequestFriends(item.payload ? item.payload : [])
                })
            }
        }  
    },[dispatch,type,valueIdUser]);

    // GET THE HEIGHT SIZE OF THE WINDOW THEN SUBTRACT 2 HEADER SIZES
    useEffect(() => {
        const withBodyWindow = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        setValueScrollInnerHeight(withBodyWindow-116.5)
    },[])

    return (  
        <div className={cx('wrapper','h-full')}>
            <div className={cx('wrapper__header','flex items-center',type === 'request' ? 'wrapper__header-request' : '')}>
                <Link to={'/friends'}>
                    <FontAwesomeIcon  className={cx('wrapper__header-icon')} icon={faArrowLeft}/>
                </Link>
                <div className={cx('wrapper__header-content','ml-5')}>
                    <div className={cx('wrapper__header-content-friends')}>Bạn bè</div>
                    <div className={cx('wrapper__header-content-title')}>{title}</div>
                </div>
            </div>
            {
                type && type === 'request' && (
                    <div className={cx('wrapper__content','')}>
                        <SimpleBarReact style={{ maxHeight: valueScrollInnerHeight - 20 }}>
                            <div className={cx('wrapper__content-request')}>
                                <div className={cx('wrapper__content-request-quantityRequest')}>{listDataRequestFriends.length} Lời mời kết bạn</div>
                                <div 
                                    className={cx('text-primaryColor text-xl font-semibold cursor-pointer')}
                                    onClick={handleShowRequestSent}
                                >Xem lời mời đã gửi</div>
                            </div>
                            {
                                listDataRequestFriends.length > 0 && listDataRequestFriends.map((item,index) => {
                                    return  <AddFriends senderId={valueIdUser} key={index} type="" data={item}></AddFriends>
                                })
                            }
                        </SimpleBarReact>
                    </div>
                )
            }
        </div>
    );
}

export default FriendsConnections;