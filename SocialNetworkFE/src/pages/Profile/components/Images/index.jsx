import classNames from "classnames/bind";
import styles from "./ImagesProfile.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { Link ,useLocation } from "react-router-dom";
import { useEffect } from "react";
import useUserToken from "~/hook/user";
import Loader from "~/components/loader/loader";
function ImagesProfile() {
    const cx = classNames.bind(styles);

    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const id = queryParams.get('id');

    const {listMediaToUser,getListMediaToUser,isLoadingMedia} = useUserToken();

     //
     useEffect(() => {
        if(id !== null){
            getListMediaToUser(id,100);
        }
    },[id]);
    return (  
        <div className={cx('wrapper','w-full h-full ')}>
            <div className={cx('',' bg-sidebar shadow-bsd-bottom rounded-lg my-10 p-8')}>
                <div className={cx('wrapper__header','flex items-center justify-between')}>
                    <h1 className="text-color-text text-2xl font-semibold hover:underline hover:cursor-pointer">Ảnh</h1>
                    <div className="flex items-center">
                        <h3 className="text-xl font-semibold text-primaryColor">Thêm ảnh/video</h3>
                        <FontAwesomeIcon className="ml-4 px-6 py-2 bg-background text-color-text rounded-xl font-semibold" icon={faEllipsisVertical}/>
                    </div>
                </div>
                {
                    isLoadingMedia ? <Loader/>  : (
                        (listMediaToUser.length > 0 ? (
                            <div className={cx("grid grid-cols-7 gap-4 mt-6")}>
                                {
                                    listMediaToUser.map((item,index) =>{
                                        return <img key={index} className={cx('w-60 h-60 object-cover rounded-lg')} src={item.mediaUrl} alt="all media"/>
                                    })
                                }
                            </div>
                        ) : (
                            <div className="text-center text-color-text font-semibold py-6">
                                <h3>Bạn chưa có hình ảnh/video</h3>
                            </div>
                        ))
                    )
                }
            </div>
        </div>
    );
}

export default ImagesProfile;