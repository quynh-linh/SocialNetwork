import classNames from "classnames/bind";
import styles from "./button.module.scss";
function Button({content='',type='',className='',handleClickBtn=undefined}) {
    const cx = classNames.bind(styles);
    return (
        <button onClick={handleClickBtn} className={cx('button',className)} type={type} >
            {content}
        </button>
    );
}

export {Button};