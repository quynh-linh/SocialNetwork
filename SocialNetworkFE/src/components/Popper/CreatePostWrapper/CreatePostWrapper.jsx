import classNames from "classnames/bind";
import styles from "./CreatePostWrapper.module.scss";
function CreatePostWrapper({children}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper')}>
            ccc
        </div>
    );
}

export default CreatePostWrapper;