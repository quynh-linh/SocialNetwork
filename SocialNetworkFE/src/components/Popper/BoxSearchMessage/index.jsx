
import Tippy from '@tippyjs/react/headless'
import FlyOutsMenuItem from './BoxSearchMenuItem';
import classNames from 'classnames/bind';
import styles from './BoxSearchMessage.module.scss';
import {Wrapper as PopperWrapper} from '~/components/Popper';
import Loader from '~/components/loader/loader';
import useUserToken from '~/hook/user';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '~/config/firebase';
import currentTime from '~/const/currentTime';
function BoxSearchMessage({items=[],children,title = '',state = false,isLoading = true,onClose=undefined}) {
    const cx = classNames.bind(styles);
    const {valueDetailUserById} = useUserToken();

    const handleSelect = async (item) => {
        //check whether the group(chats in firestore) exists, if not create
        console.log(valueDetailUserById);
        console.log(item.id);
        const combinedId =
            valueDetailUserById.id > item.id
            ? valueDetailUserById.id + item.id
            : item.id + valueDetailUserById.id;
        try {
            const res = await getDoc(doc(db, "chats", combinedId));

            if (!res.exists()) {
                //create a chat in chats collection
                await setDoc(doc(db, "chats", combinedId), { messages: [] });

                //create user chats
                await updateDoc(doc(db, "userChats", valueDetailUserById.id), {
                    [combinedId + ".userInfo"]: {
                        uid: item.id,
                        displayName: item.firstName+ " " + item.lastName,
                        photoURL: item.image,
                    },
                    [combinedId + ".date"]: currentTime(),
                });

                await updateDoc(doc(db, "userChats", item.id), {
                    [combinedId + ".userInfo"]: {
                    uid: valueDetailUserById.id,
                    displayName: valueDetailUserById.firstName + " " + valueDetailUserById.lastName,
                    photoURL: valueDetailUserById.image,
                    },
                    [combinedId + ".date"]: currentTime(),
                });
            }
        } catch (err) {}
    };

    const handleClickMenuItem = (data) => {
        if (data) {
            handleSelect(data);
            onClose(false);
        }
    };
    const showFlyOutsMenuitem = () => {
        return items.map((item,index) => <FlyOutsMenuItem onClick={(e) => handleClickMenuItem(e)} key={index} data={item}></FlyOutsMenuItem> )
    }
    return ( 
        <Tippy
            content= {title}
            visible = {state === true}
            interactive
            placement='bottom-start'
            appendTo={document.body}
            render={attrs => (
                <div className={cx('content','bg-background text-white')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {
                            items.length <= 0 ? (
                                <h1>Không có tìm kiếm nào gần đây</h1>
                            ) : (
                                !isLoading ?
                                    showFlyOutsMenuitem()
                                : <Loader/>
                            )
                        }
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default BoxSearchMessage;