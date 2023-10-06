import className from 'classnames/bind';
import styles from "./FlyoutsMenu.module.scss";
function FlyOutsMenuItem({data, onClick=undefined}) {
    const cx = className.bind(styles);
    const handleClickBox = () =>{
        onClick(data)
    }
    return (
        <div className={cx('menu-box')} onClick={handleClickBox}>
            <div>{data.name}</div>
        </div>
    );
}

export default FlyOutsMenuItem;