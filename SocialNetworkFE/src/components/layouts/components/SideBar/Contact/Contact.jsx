import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import AddFriends from "~/components/form/AddFriends/AddFriends";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getListSuggestedFriends } from "~/redux/authSlice";
import useUserToken from "~/hook/user";
function SidebarContact() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [listUsersDb,setListUsersDb] = useState([]);
    const {valueIdUser} = useUserToken();
    const handleClickAddFriends = (e) => {

    };

    useEffect(() =>{
        if(valueIdUser !== undefined){
            dispatch(getListSuggestedFriends({id : valueIdUser})).then((items) => {
                const newList = items.payload ? items.payload : [];
                setListUsersDb(newList);
            })
        }
    },[dispatch,valueIdUser]);
    
    return ( 
        <div className={cx('wrapper','bg-sidebar shadow-bsd-bottom')}>
            <div>
                <h2 className={cx("wrapper__titleFollow")}>Bạn có thể biết</h2>
                {
                    listUsersDb.map((items,index) => {
                        return <AddFriends type='add friends' key={index} data={items} onClickItem={(e) => handleClickAddFriends}/>
                    })
                }
                
            </div>
        </div>
    );
}

export default SidebarContact;