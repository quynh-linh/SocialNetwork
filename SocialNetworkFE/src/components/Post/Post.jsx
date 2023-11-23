import classNames from "classnames/bind";
import styles from "./Post.module.scss";
import images from "~/assets/images";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleDot, faComment, faEllipsisVertical, faShare, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import Comment from "../form/Comment/Comment";
import calculateTime from "~/const/calculateTime";
function Post({data}) {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper','bg-sidebar')}>
            <div className={cx('wrapper__header')}>
                <div className={cx('wrapper__header-info','flex items-center justify-between p-5')}>
                    <div className={cx('flex')}>
                        <img className={cx('wrapper__header-info-img','w-20 h-20')}  src={data && data.avatarUser ? data.avatarUser : images.user} alt="POST USER"/>
                        <div className={cx('text-white pl-5')}>
                            <div className={cx('flex items-center')}>
                                <span className={cx('wrapper__header-info-name','')}>{data && data.firstName && data.lastName ? data.firstName  + " " + data.lastName : ""}</span>
                                <FontAwesomeIcon className={cx('wrapper__header-info-icon','w-3 h-3')} icon={faCircleDot}/>
                                <span className={cx('wrapper__header-info-timePost','')}>{data && data.createdAt ? calculateTime(data.createdAt) : ""}</span>
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
                    <div className={cx('wrapper__content-des','py-8 px-5')}>
                        {data && data.content ? data.content : ""}
                    </div>
                    {
                        data && data.media ? (
                            <div className={cx('wrapper__content-imgPost','grid gap-4',data.media.length === 1 ? 'grid-cols-1' : 'grid-cols-2')}>
                                {
                                    data.media.map((item,index) => {
                                        if(item.mediaType === "videos"){
                                            return <video key={index} className="w-full h-auto shadow-bsd-bottom" controls src={item.mediaUrl} />
                                        } else {
                                            return <img className="w-full h-auto object-cover shadow-bsd-bottom" key={index} src={item.mediaUrl} alt={item.mediaUrl}/>
                                        }
                                    })
                                }   
                                
                            </div>
                        ) : ""
                    }
                    <div className={cx('wrapper__content-interactWith','text-white flex items-center justify-between px-10 py-5')}>
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
                    <div className={cx('wrapper__content-addComment','p-5')}>
                        <Comment type="add comment"/>
                    </div>
                    {/* REPLY COMMENTS */}
                    <div className="p-5">
                        <Comment type="reply comment"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;