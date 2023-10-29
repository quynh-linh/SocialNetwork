import { useState } from "react";
import { useDispatch } from "react-redux";
import currentTime from "~/const/currentTime";
import { updateStatusByFriends } from "~/redux/authSlice";
import { addFriends } from "~/redux/friendSlice";

function useFriends(receiverId,senderId) {
    const [valueResultRequest,setValueResultRequest] = useState({});
    const dispatch = useDispatch();

    // HANDLE CLICK CONFIRM REQUEST
    const handleClickConfirmRequest = () => {
        if(receiverId !== null && senderId !== null){
            dispatch(updateStatusByFriends({
                title : 'confirm',
                receiverId : receiverId,
                senderId : senderId
            })).then((item) => {
                const msg = item.payload && item.payload.message ? item.payload.message : '';
                if(msg === "success update"){
                    const update = {...valueResultRequest , id : receiverId, name : 'confirm'};
                    setValueResultRequest(update);
                }
            })
        }
    };

    // HANDLE CLICK CANCEL REQUEST
    const handleClickCancelRequest = () => {
        if(receiverId !== null && senderId !== null){
            dispatch(updateStatusByFriends({
                title : 'cancel',
                receiverId : receiverId,
                senderId : senderId
            })).then((item) => {
                const msg = item.payload && item.payload.message ? item.payload.message : '';
                if(msg === "success update"){
                    const update = {...valueResultRequest , id : receiverId, name : 'cancel'};
                    setValueResultRequest(update);
                }
            })
        }
    };

    // HANDLE CLICK CANCEL REQUEST
    const handleAddFriendsRequest = () => {
        if(receiverId !== null && senderId !== null){
            const dateTime = currentTime();
            const newFriends = {
                senderId: senderId,
                receiverId: receiverId,
                createdAt: dateTime
            };
            dispatch(addFriends(newFriends)).then((item) => {
                const msg = item.payload && item.payload.message ? item.payload.message : '';
                if(msg === "success"){
                    const update = {...valueResultRequest , id : receiverId, name : 'add'};
                    setValueResultRequest(update);
                }
            });
        }
    };

    return {
        handleClickCancelRequest,
        handleClickConfirmRequest,
        valueResultRequest,
        handleAddFriendsRequest
    };
}
export default useFriends;