import classNames from "classnames/bind";
import styles from "./Messages.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faPaperPlane, faPhone, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetailUserById } from "~/redux/authSlice";
import Message from "~/components/Message";
import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "~/config/firebase";
import { v4 as uuidv4 } from 'uuid';
import currentTime from "~/const/currentTime";
import useUserToken from "~/hook/user";
function Messages() {
    const cx = classNames.bind(styles);
    const [valueObDetailUser,setValueObDetailUser] = useState({});
    const [messages, setMessages] = useState([]);
    const [valueTextSent,setValueTextSent] = useState('');
    const {valueDetailUserById} = useUserToken();
    //
    const { search } = useLocation();
    const location = useLocation();
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('id');
    const room = queryParams.get('r');

    const handleChangeValueSent = (e) => {
        setValueTextSent(e.target.value);
    };

    const handleClickSent = async ()=> {
        await updateDoc(doc(db, "chats", room), {
            messages: arrayUnion({
                id: uuidv4(),
                text: valueTextSent,
                senderId: valueDetailUserById.id,
                date: currentTime(),
            }),
        });
        await updateDoc(doc(db, "userChats", valueDetailUserById.id), {
            [room + ".lastMessage"]: {
                text: valueTextSent,
            },
            [room + ".date"]: currentTime(),
        });
        await updateDoc(doc(db, "userChats", query), {
            [room + ".lastMessage"]: {
                text: valueTextSent,
            },
            [room + ".date"]: currentTime(),
        });
        setValueTextSent('')
    }

    //
    useEffect(() => {
        if (query !== valueDetailUserById.id) {
            console.log(query);
            dispatch(getDetailUserById({ id: query}));
        }
    },[query]);


    useEffect(() => {
        if(room){
            const unSub = onSnapshot(doc(db, "chats", room), (doc) => {
                doc.exists() && setMessages(doc.data().messages);
            });
            return () => {
                unSub();
            };
        }
    }, [room]);

    //
    useEffect(() => {
        const isObDetailNotEmpty = state?.obDetail && Object.keys(state.obDetail).length > 0;
        if (isObDetailNotEmpty && state.obDetail.id === query) {
            console.log(state.obDetail);
            setValueObDetailUser(state.obDetail);
        }
    }, [state]);

    return (  
        <div className={cx('wrapper','relative h-full')}>
            {
                query === null && room === null ? (
                    <div className="h-full flex items-center justify-center">
                        <h1 className="text-search text-3xl font-bold">Bấm vào cuộc trò chuyện để xem</h1>
                    </div>
                ) : (
                    <div>
                        <div className={cx('wrapper__header',' bg-sidebar shadow-bsd-bottom p-6 flex items-center justify-between border-b border-background')}>
                            <div className="flex items-center">
                                <img
                                    className="w-16 h-16 rounded-full"
                                    src={valueObDetailUser?.image}
                                    alt="header"
                                />
                                <div className="ml-6 text-search">
                                    <h1 className="text-xl font-semibold">
                                        {valueObDetailUser?.firstName && valueObDetailUser?.lastName ?
                                        valueObDetailUser.firstName +" "+valueObDetailUser.lastName : ''}</h1>
                                    <span className="text-lg font-semibold">Đang hoạt động</span>
                                </div>
                            </div>
                            <div className="flex items-center text-text-primary font-bold">
                                <FontAwesomeIcon className="p-4 bg-comment rounded-full" icon={faPhone}/>
                                <FontAwesomeIcon className="p-4 bg-comment ml-4 rounded-full" icon={faCamera}/>
                            </div>
                        </div>
                        <div className={cx('wrapper__messages')}>
                            {messages.map((m) => (
                                <Message message={m} key={m.id} />
                            ))}
                        </div>
                        <div className={cx('wrapper__footer',"absolute w-full  bottom-16 h-24")}>
                            <div className="relative w-full">
                                <FontAwesomeIcon
                                    className="absolute left-2 text-text-primary bottom-0 top-0 m-auto p-2 rounded-full text-2xl bg-second"
                                    icon={faPlus}
                                />
                                <input
                                    className="w-full py-4 pl-14 pr-12 bg-comment text-search text-2xl font-medium outline-none
                                    border-t border-background"
                                    placeholder="Aa"
                                    onChange={handleChangeValueSent}
                                    value={valueTextSent}
                                />
                                <FontAwesomeIcon
                                    className="absolute right-6 text-text-primary bottom-0 top-0 m-auto"
                                    icon={faPaperPlane}
                                    onClick={handleClickSent}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
            
        </div>
    );
}

export default Messages;