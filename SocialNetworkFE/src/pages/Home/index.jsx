import classNames from "classnames/bind";
import styles from "./Home.module.scss";
import CreatePost from "~/components/form/CreatePost/CreatePost";
import Post from "~/components/Post/Post";
function Home() {
    const cx = classNames.bind(styles);
    return ( 
        <div className={cx('wrapper')}>
            <div className={cx('bg-sidebar','wrapper__createPost')}><CreatePost/></div>
            <div className={cx('wrapper_listPost')}>
                <Post/>
            </div>
        </div>
    );
}
export default Home;