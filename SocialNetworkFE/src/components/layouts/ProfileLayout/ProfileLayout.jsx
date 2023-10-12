import classNames from "classnames/bind";
import styles from './ProfileLayout.module.scss';
import Header from "../components/Header";
function ProfileLayout({children}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper','w-full h-full')}>
            <Header/>
            <div className={cx('wrapper__container','w-full h-full')}>
                {children}
            </div>
        </div>
    );
}

export default ProfileLayout;