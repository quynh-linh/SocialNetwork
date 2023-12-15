import classNames from "classnames/bind";
import styles from "./MessagesSidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faEllipsisVertical, faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import useUserToken from "~/hook/user";
import { db } from "~/config/firebase";
import { doc, onSnapshot} from "firebase/firestore";
import BoxSearchMessage from "~/components/Popper/BoxSearchMessage";
import { useNavigate } from "react-router-dom";
function MessagesSidebar() {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    const {listUserFriends,getListFriendsToUser,valueDetailUserById,valueIdUser} = useUserToken();
    const [listChats,setChats] = useState([]);
    const [valueInputSearch,setValueSearch] = useState('');
    const [listUserBySearch,setListUserBySearch] = useState([]);
    const [isShowBoxSearch,setShowBoxSearch] = useState(false);
    const [isLoadingSearch,setLoadingSearch] = useState(true);

    function searchApproximately(input, array) {
        const lowercasedInput = input.toLowerCase();
        return array.filter(item => item.lastName.toLowerCase().includes(lowercasedInput));
    }

    // HANDLE CLICK INPUT SEARCH
    const handleClickInputSearch = () => {
        setShowBoxSearch(true);
    };

    const handleChangeSearch = (e) => {
        const value = e.target.value;
        setValueSearch(value);
        if(listUserFriends.length > 0){
            setListUserBySearch(searchApproximately(value,listUserFriends));
            setLoadingSearch(false);
        }
    }

    const handleCloseBoxSearch = () => {
        if(isShowBoxSearch) setShowBoxSearch(false);
    }

    const handleSelect = (u) => {
        navigate(`/messages?id=${u[1].userInfo.uid}&&r=${u[0]}`);
    };
    
    useEffect(() => {
        if(valueIdUser !== undefined) getListFriendsToUser(valueIdUser,100);
    },[valueIdUser]);


    useEffect(() => {
        const getChats = () => {
          const unsub = onSnapshot(doc(db, "userChats", valueDetailUserById.id), (doc) => {
            setChats(doc.data());
          });
    
          return () => {
            unsub();
          };
        };
        valueDetailUserById.id && getChats();
    }, [valueDetailUserById.id]);

    useEffect(() => {
        if(valueInputSearch === '') {
            setListUserBySearch([]);
        }
    },[valueInputSearch])

    return (  
        <div className={cx('wrapper','fixed bg-sidebar bottom-0 top-24 py-8 px-6 border-r border-background')}>
            <div className={cx('wrapper__header')}>
                <div className="flex items-center justify-between  text-search">
                    <h1 className="text-4xl font-semibold">Đoạn chat</h1>
                    <FontAwesomeIcon className="px-6 py-4 text-2xl rounded-full bg-comment" icon={faEllipsisVertical}/>
                </div>
                <BoxSearchMessage
                    items={listUserBySearch}
                    state={isShowBoxSearch}
                    isLoading={isShowBoxSearch ? isLoadingSearch : true}
                    onClose={(e) => setShowBoxSearch(e)}
                >
                    <div className="mt-4 p-2 relative">
                        <FontAwesomeIcon 
                            className="absolute left-6 text-2xl top-0 bottom-0 m-auto text-color-text hover:cursor-pointer" 
                            icon={isShowBoxSearch ? faArrowLeft : faSearch}
                            onClick={handleCloseBoxSearch}
                        />
                        <input 
                            className="bg-comment w-full pl-12 py-4 text-2xl rounded-2xl outline-none text-search" 
                            placeholder="Tìm kiếm trên Messenger"
                            onClick={handleClickInputSearch}
                            onChange={handleChangeSearch}
                        />
                    </div>
                </BoxSearchMessage>
                <div className="mt-4 p-2 flex items-center">
                    <span className="px-6 py-4 bg-second text-text-primary font-semibold rounded-3xl text-xl">Hộp thư</span>
                    <span className="px-6 py-4 ml-4 bg-comment text-search font-semibold rounded-3xl text-xl">Cộng đồng</span>
                </div>
            </div>
            <div className={cx('wrapper__listMessage','overflow-y-scroll')}>
                <ul className="pt-4">
                {
                    listChats ? (
                        Object.entries(listChats)?.sort((a,b)=>b[1].date - a[1].date).map((item) => {
                            return (
                                <li 
                                    key={item[0]} 
                                    className={cx("flex items-center mt-4 p-2 rounded-2xl hover:bg-comment hover:cursor-pointer")}
                                    onClick={() => handleSelect(item)}
                                >
                                    <div className="relative">
                                        <img
                                            className="w-20 h-w-20 rounded-full"
                                            src={item[1].userInfo.photoURL}
                                            alt="message user"
                                        />
                                        <div className="absolute right-0 bottom-0 w-5 h-5 rounded-full bg-text-primary"></div>
                                    </div>
                                    <div className="ml-6">
                                        <h1 className="text-search text-2xl font-bold">{item[1].userInfo.displayName}</h1>
                                        <span 
                                            className="text-xl text-color-text font-semibold"
                                        >
                                            {valueDetailUserById.id === item[1].userInfo.uuid ? 'Bạn: ' : ''} {item[1].lastMessage?.text}
                                        </span>
                                    </div>
                                </li>
                            )
                        })
                    ) : (
                        <li className="text-center mt-4">
                            <h1 className="text-xl text-search font-semibold">Bạn chưa có cuộc trò chuyện nào</h1>
                            <span className="text-lg font-medium underline text-color-text">Tìm hiểu thêm</span>
                        </li>
                    )
                }
                </ul>
            </div>
        </div>
    );
}

export default MessagesSidebar;