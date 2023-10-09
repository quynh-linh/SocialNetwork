import classNames from "classnames/bind";
import styles from "./AuthLayout.module.scss";
import images from "~/assets/images";
function AuthLayout({children}) {
    const cx= classNames.bind(styles);
    return ( 
        <div className={cx('h-full flex items-center bg-white')}>
            <div className={cx('w-3/6 h-screen flex items-center')}>
                <img className={cx('h-auto')} src={images.bgLogin} alt="Background Login" />
            </div>
            <div className={cx('w-3/6 h-screen flex items-center')}>
                {children}
            </div>
        </div>
    );
}

export default AuthLayout;