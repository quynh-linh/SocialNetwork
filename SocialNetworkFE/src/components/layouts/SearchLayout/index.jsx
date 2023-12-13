import Header from "../components/Header";
import classNames from "classnames/bind";
import styles from "./SearchLayout.module.scss";
import SearchSidebar from "../components/SideBar/Search";
function SearchLayout() {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('wrapper','relative w-full h-full')}>
            <Header/>
            <SearchSidebar/>
        </div>
    );
}

export default SearchLayout;