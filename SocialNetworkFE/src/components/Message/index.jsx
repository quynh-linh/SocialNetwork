import useUserToken from "~/hook/user";
import classNames from "classnames/bind";
import styles from "./Message.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetailUserById } from "~/redux/authSlice";
import calculateTime from "~/const/calculateTime";
function Message({message}) {
    const cx = classNames.bind(styles);
    const [valueObDetailUser,setValueObDetailUser] = useState({});
    const dispatch = useDispatch();
    const state = useSelector(state => state.auth);
    const {valueDetailUserById} = useUserToken();

    //
    useEffect(() => {
        if (message.senderId !== '') {
            dispatch(getDetailUserById({ id: message.senderId}));
        }
    },[message.senderId]);

    //
    useEffect(() => {
        const isObDetailNotEmpty = state?.obDetail && Object.keys(state.obDetail).length > 0;
        if (isObDetailNotEmpty && state.obDetail.id === message.senderId) {
            setValueObDetailUser(state.obDetail);
        }
    }, [state]);
    return (  
        <div
            className={cx('text-search font-semibold mt-4 flex items-center'
            ,message.senderId === valueDetailUserById.id ? 'justify-end' : 'justify-start')}
        >
            <div>
                <div className={cx("flex items-center")}
                >
                    <div className="">
                        <img
                            className="w-14 h-14 rounded-full"
                            src={
                                message.senderId === valueDetailUserById.id
                                  ? valueDetailUserById.image
                                  : valueObDetailUser.image
                            }
                            alt=""
                        />
                
                    </div>
                    <div className={cx("ml-4 py-4 px-6 text-xl rounded-2xl",
                        message.senderId === valueDetailUserById.id ? 'bg-primaryColor text-white' : 'bg-comment')}
                    >
                        <p>{message.text}</p>
                    </div>
                </div>
                <div className="mt-4 ml-2"><p className="text-base font-semibold">{"đã gửi " + calculateTime(message.date)+" trước"}</p></div>
            </div>
        </div>
    );
}

export default Message;