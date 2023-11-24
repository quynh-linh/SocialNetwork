import classNames from "classnames/bind";
import styles from "./Comment.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
function Comment({type=''}) {
    const cx = classNames.bind(styles);
    return ( 
        <div className={cx('wrapper','w-full flex items-center')}>
            <div className={cx('wrapper__img','')}>
                <img src={images.user} className={cx('wrapper__img-imgUser','w-16 h-16')} alt="COMMENTS USER"/>
            </div>
            <div className={cx('wrapper__addComment','')}>
                <input className={cx('bg-comment')} type="text" placeholder="Viết câu trả lời"/>
                <FontAwesomeIcon className={cx('wrapper__addComment-icon')} icon={faPaperPlane}/>
            </div>
        </div>
    );
}

export default Comment;