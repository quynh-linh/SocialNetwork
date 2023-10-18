import classNames from "classnames/bind";
import styles from "./input.module.scss";
function InputTemplate({title='',type='',placeholder='',className=''}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('w-full',className)}>
            <div className={cx('title')}>{title}</div>
            <input
                type={type}
                placeholder={placeholder}
                className={cx('btn')}
            />
        </div>
    );
}

export {InputTemplate};