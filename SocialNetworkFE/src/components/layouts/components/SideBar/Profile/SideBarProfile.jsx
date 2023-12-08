import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";
import { DATA_PAGES } from "~/const/data";
import { Link } from "react-router-dom";
import useUserToken from "~/hook/user";
function SideBarProfile() {
    const cx = classNames.bind(styles);
    const {valueIdUser,valueDetailUserById} = useUserToken();

    return ( 
        <div className={cx('bg-sidebar shadow-bsd-bottom','wrapper')}>
            <div className={cx('wrapper__profileUser')}>
                <div className={cx('wrapper__profileUser-background')}>
                    <div className={cx('wrapper__profileUser-background-avatar','rounded-full')}>
                        <img className={cx('w-28 h-28 rounded-full object-cover')} src={valueDetailUserById.image} alt="Profile User"/>
                    </div>
                </div>
                <div className={cx('wrapper__profileUser-info','text-white text-center ')}>
                    <div className={cx('wrapper__profileUser-info-title','text-3xl font-semibold')}>{valueDetailUserById && valueDetailUserById.firstName + " " + valueDetailUserById.lastName}</div>
                    <div className={cx('wrapper__profileUser-info-job')}>Web developer</div>
                    <div className={cx('wrapper__profileUser-info-des')}>I'd love to change the world, but they won’t give me the source code.</div>
                </div>
                <div className={cx('wrapper__profileUser-followSocial','text-white text-center flex items-center justify-around')}>
                    <div className={cx('wrapper__profileUser-followSocial-Post','')}>
                        <p>256</p>
                        <p className="text-color-text text-xl">Post</p>
                    </div>
                    <div className={cx('wrapper__profileUser-followSocial-Followers','')}>
                        <p>11.2k</p>
                        <p className="text-color-text text-xl">Followers</p>
                    </div>
                    <div className={cx('wrapper__profileUser-followSocial-Following','')}>
                        <p>669</p>
                        <p className="text-color-text text-xl">Following</p>
                    </div>
                </div>
                <div className={cx('wrapper__profileUser-page','text-white text-center ')}>
                    {DATA_PAGES.map((item,index)=> {
                        return (
                            <Link to={item.path} key={index} className={cx('flex items-center text-white font-semibold','wrapper__profileUser-page-item')}>
                                <img className={cx('w-7 h-w-7')} src={item.icon} alt="Home page" />
                                <span className={cx('pl-10 text-lg')}>{item.name}</span>
                            </Link>
                        )
                    })}
                    
                </div>
                <div className={cx('wrapper__profileUser-view','text-center')}>
                    <Link to={`/profile?id=${valueIdUser}`} className={cx('wrapper__profileUser-view-profile','text-lg')}>
                        View Profile
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default SideBarProfile;