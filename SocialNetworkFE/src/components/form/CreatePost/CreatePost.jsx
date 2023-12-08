import classNames from "classnames/bind";
import styles from "./CreatePost.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import useUserToken from "~/hook/user";
import { useSelector } from "react-redux";
function CreatePost({onShow=undefined,inProfile=undefined}) {
    const cx = classNames.bind(styles);
    const {nameUrlImageUser} = useUserToken();
    const state = useSelector(state => state.auth);
    const handleLClickShowCreatePost = () => {
        onShow(true);
    }
    
    return ( 
        <div className={cx('wrapper','w-full')}>
            <div className={cx('wrapper__inputPost','flex items-center')}>
                <span className={cx('wrapper__inputPost-img','')}>
                    <img src={nameUrlImageUser} className={cx('w-20 h-20 rounded-full object-cover')} alt="User Post"/>
                </span>
                <input 
                    className={cx('bg-background','wrapper__inputPost-input')} 
                    type="text" 
                    placeholder={
                        inProfile?.firstName && inProfile?.lastName
                          ? `Hãy viết dì đó cho ${inProfile.firstName} ${inProfile.lastName}`
                          : state.user?.firstName && state.user?.lastName
                          ? `${state.user.firstName} ${state.user.lastName} ơi, bạn đang nghĩ gì thế !`
                          : ''
                    } 
                    readOnly
                    onClick={handleLClickShowCreatePost}
                />
            </div>
            <div className={cx('wrapper__menuPost','flex items-center justify-between')}>
                <div className={cx('','flex items-center')}>
                    <div className={cx('wrapper__menuPost-uploadPhoto','flex items-center bg-background text-white')}>
                        <img className={cx('w-7 h-7')} src={images.uploadPhoto} alt="djpqwjdpwqjdpqwdjqwp"/>
                        <span>Photo</span>
                    </div>
                    <div className={cx('wrapper__menuPost-uploadVideo','flex items-center bg-background text-white')}>
                        <img className={cx('w-7 h-7')} src={images.uploadVideo} alt="Upload Video"/>
                        <span>Video</span>
                    </div>
                    <div className={cx('wrapper__menuPost-uploadEvent','flex items-center bg-background text-white')}>
                        <img className={cx('w-7 h-7')} src={images.uploadEvent} alt="Upload Event"/>
                        <span>Event</span>
                    </div>
                    <div className={cx('wrapper__menuPost-uploadFeeling','flex items-center bg-background text-white')}>
                        <img className={cx('w-7 h-7')} src={images.uploadFeeling} alt="Upload Feeling"/>
                        <span>Feeling/Activity</span>
                    </div>
                </div>
                <div className={cx('bg-background text-white','wrapper__menuPost-more')}>
                    <FontAwesomeIcon icon={faEllipsisVertical}/>
                </div>
            </div>
        </div>
    );
}

export default CreatePost;