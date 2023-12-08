import classNames from "classnames/bind";
import styles from "../ShowFirstComment/ShowComment.module.scss";
export default function MenuComment({onClickReply}) {
    const cx = classNames.bind(styles);
    const handleReplyComment = () => {
        onClickReply(true);
    };
    return (
        <ul className={cx('flex items-center','wrapper__showComment-menu')}>
            <li>
                <span>Thích</span>
            </li>
            <li className={cx('pl-10')} onClick={handleReplyComment}>
                <span>Phản hồi</span>
            </li>
        </ul>
    )
}