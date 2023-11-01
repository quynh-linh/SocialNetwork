import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import styles from "./authForm.module.scss";
import images from "~/assets/images";
function AuthForm({children,title='',des='',toWith=''}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('container','w-full')}>
            <div className={cx('container-animation','w-full')}>
                <div className={cx('container__header','text-center')}>
                    <div className={cx('flex justify-center')}><img src={images.logoLogin}/></div>
                    <h1>{title}</h1>
                    <div className={cx('text-2xl')}>
                        <span>{des} </span>
                        <Link to={title === 'Đăng nhập' ?'/register' : '/login'} className={cx('text-primaryColor font-semibold cursor-pointer')}>{toWith}</Link>
                    </div>
                </div>
                {children}
            </div>
        </div>
    );
}

export default AuthForm;