import classNames from "classnames/bind";
import styles from "./Post.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleDot, faComment, faEllipsisVertical, faShare, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Comment from "../form/Comment/Comment";
function Post() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper','bg-sidebar')}>
            <div className={cx('wrapper__header')}>
                <div className={cx('wrapper__header-info','flex items-center justify-between')}>
                    <div className={cx('flex')}>
                        <img className={cx('wrapper__header-info-img','w-20 h-20')}  src={images.user} alt="POST USER"/>
                        <div className={cx('text-white pl-5')}>
                            <div className={cx('flex items-center')}>
                                <span className={cx('wrapper__header-info-name','')}>Quynh Linh</span>
                                <FontAwesomeIcon className={cx('wrapper__header-info-icon','w-3 h-3')} icon={faCircleDot}/>
                                <span className={cx('wrapper__header-info-timePost','')}>2 hr</span>
                            </div>
                            <div className={cx('wrapper__header-info-jobAt','')}>
                                Web Developer at Tp.Ho Chi Minh
                            </div>
                        </div>
                    </div>
                    <div className={cx('text-white')}>
                        <FontAwesomeIcon icon={faEllipsisVertical}/>
                    </div>
                </div> 
                <div className={cx('wrapper__content')}>
                    <div className={cx('wrapper__content-des')}>
                        I'm thrilled to share that I've completed a graduate certificate course in project management with the president's honor roll.
                    </div>
                    <div className={cx('wrapper__content-imgPost')}>
                        <img src={images.bgUser} alt="IMAGE POST"/>
                    </div>
                    <div className={cx('wrapper__content-interactWith','text-white flex items-center justify-between')}>
                        <div className={cx('flex items-center')}>
                            <div className={cx('wrapper__content-interactWith-Likes','text-primaryColor flex items-center')}>
                                <FontAwesomeIcon icon={faThumbsUp}/>        
                                <span className="pl-3">Liked</span>
                                <span className={cx('wrapper__content-interactWith-Likes-quantity','')}>(103)</span>
                            </div>
                            <div className={cx('wrapper__content-interactWith-Comments','flex items-center')}>
                                <FontAwesomeIcon icon={faComment}/>
                                <span className="pl-3">Comments</span>
                                <span  className={cx('wrapper__content-interactWith-Comments-quantity','')}>(103)</span>
                            </div>
                        </div>
                        <div className={cx('wrapper__content-interactWith-Share','flex items-center')}>
                            <FontAwesomeIcon icon={faShare}/>
                            <span className="pl-3">Share</span>
                            <span  className={cx('wrapper__content-interactWith-Share-quantity','')}>(103)</span>
                        </div>
                    </div>
                    <div className={cx('wrapper__content-addComment')}>
                        <Comment type="add comment"/>
                    </div>
                    {/* REPLY COMMENTS */}
                    <div>
                        <Comment type="reply comment"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;