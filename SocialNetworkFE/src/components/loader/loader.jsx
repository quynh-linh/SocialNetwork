import classNames from "classnames/bind";
import styles from "./loader.module.scss";
function Loader() {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx("cssload-loader")}>
            <div className={cx("cssload-inner","cssload-one")}></div>
            <div className={cx("cssload-inner","cssload-two")}></div>
            <div className={cx("cssload-inner","cssload-three")}></div>
        </div>
    );
}

export default Loader;