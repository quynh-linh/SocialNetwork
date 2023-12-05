import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import styles from './ProfileLayout.module.scss';
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import useUserToken from "~/hook/user";
function ProfileLayout({children}) {
    const cx = classNames.bind(styles);
    const [valueOnScrollTopWindow,setOnScrollTopWindow] = useState(0);
    const {valueDetailUserById,nameUrlImageUser} = useUserToken();

    // SET SCROLL TOP FOR VALUE ON SCROLL THEN SEND THE DATA TO COMPONENTS HEADER
    const handleOnScrollWindow = (e) => {
        setOnScrollTopWindow(e.target.scrollTop);
    };
    const handleClickBackToTop = ()=> {
        window.scrollTo(0, 0);
    };
    useEffect(()=>{
        // 👇️ scroll to top on page load
        window.scrollTo(0, 0);
    },[]);
    return (  
        <div className={cx('wrapper','w-full h-full')} onScroll={(e) => handleOnScrollWindow(e)}>
            <Header/>
            {
                valueOnScrollTopWindow > 470 ? (
                    <div className={cx('wrapper__headerUser','flex items-center justify-between bg-black text-white')}>
                        <div className={cx('flex items-center','wrapper__headerUser-box')} onClick={handleClickBackToTop}>
                            <img className={cx('w-16 h-16 rounded-full')} src={nameUrlImageUser !=='' ? nameUrlImageUser : ''} alt="user"/>
                            <span>{valueDetailUserById && (valueDetailUserById.firstName && valueDetailUserById.lastName) ? valueDetailUserById.firstName+" "+valueDetailUserById.lastName : ''}</span>
                        </div>
                        <FontAwesomeIcon className={cx('wrapper__headerUser-icon')} icon={faEllipsisVertical}/>
                    </div>
                ) : ''
            }
            <div className={cx('wrapper__container','w-full h-full')}>
                {children}
            </div>
        </div>
    );
}

export default ProfileLayout;