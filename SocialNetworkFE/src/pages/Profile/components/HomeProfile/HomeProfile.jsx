import classNames from "classnames/bind";
import styles from "./HomeProfile.module.scss";
import Post from "~/components/Post/Post";
function HomeProfile() {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper','flex')}>
            <div className={cx('wrapper__left','w-2/6')}>
                <div className={cx('wrapper__left-info','bg-sidebar mt-15 text-white')}>
                    <span className={cx('wrapper__left-info-title')}>Giới thiệu</span>
                    <div className={cx('wrapper__left-info-introduce','text-center')}>
                        <div className={cx('wrapper__left-info-introduce-des')}>yen</div>
                        <button type="button">Chỉnh sữa tiểu sử</button>
                    </div>
                </div>
            </div>
            <div className={cx('wrapper__right','w-4/6')}>
                <Post/>
            </div>
        </div>
    );
}

export default HomeProfile;