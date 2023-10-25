import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import AddFriends from "~/components/form/AddFriends/AddFriends";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getInfoUserByToken, getListSuggestedFriends } from "~/redux/authSlice";
function SidebarContact() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [listUsersDb,setListUsersDb] = useState([]);

    useEffect(() =>{
        const tokenUser = localStorage.getItem('token');
        if(tokenUser !== null) {
            dispatch(getInfoUserByToken(tokenUser)).then((user) => {
                const id =  user.payload ? (user.payload.id ? user.payload.id : null) : null;
                if(id !== null){
                    dispatch(getListSuggestedFriends(id)).then((items) => {
                        setListUsersDb(items.payload);
                    })
                }
            });
        }
    },[dispatch]);
    return ( 
        <div className={cx('wrapper','bg-sidebar shadow-bsd-bottom')}>
            <div>
                <h2 className={cx("wrapper__titleFollow")}>Bạn có thể biết</h2>
                {
                    listUsersDb.map((items,index) => {
                        return <AddFriends key={index} data={items}/>
                    })
                }
                
            </div>
        </div>
    );
}

export default SidebarContact;