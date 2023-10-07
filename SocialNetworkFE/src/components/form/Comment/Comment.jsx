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
            {
                type === 'add comment' ? (
                    <div className={cx('wrapper__addComment','')}>
                        <input className={cx('bg-comment')} type="text" placeholder="Comment"/>
                        <FontAwesomeIcon className={cx('wrapper__addComment-icon')} icon={faPaperPlane}/>
                    </div>
                ) : ''
            }
            {
                type === 'reply comment' ? (
                    <div className={cx('wrapper__replyComment','')}>
                        <div  className={cx('wrapper__replyComment-content','bg-comment flex')}>
                            <div>
                                <div className={cx('wrapper__replyComment-content-title','text-white font-semibold')}>Quan Van Manh</div>
                                <div className={cx('wrapper__replyComment-content-des','')}>Removed demands expense account in outward tedious do. Particular way thoroughly unaffected projection.</div>
                            </div>
                            <div className={cx('wrapper__replyComment-content-timeAt','')}>2hr</div>
                        </div>
                        <div className={cx('wrapper__replyComment-menu','')}>
                            <ul className={cx('flex items-center')}>
                                <li>
                                    <span>Like</span>
                                    <span>(3)</span>
                                </li>
                                <li className={cx('pl-10')}>
                                    <span>Reply</span>
                                </li>
                                <li className={cx('pl-10')}>
                                    <span>View</span>
                                    <span> 5 </span>
                                    <span>replies</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                ) : ''
            }
        </div>
    );
}

export default Comment;