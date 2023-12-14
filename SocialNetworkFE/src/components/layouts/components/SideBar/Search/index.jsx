import classNames from "classnames/bind";
import styles from "./SearchSidebar.module.scss";
import { DATA_SIDEBAR_SEARCH } from "~/const/data";
import { Link , useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
function SearchSidebar() {
    const cx =classNames.bind(styles);
    const location = useLocation();
    //
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q');
    return (  
        <div className={cx('wrapper','top-24 fixed left-0 bottom-0 bg-sidebar text-search')}>
            <div className="py-6 mx-8 border-b border-gray">
                <h1 className="text-4xl font-bold">Kết quả tìm kiếm</h1>
            </div>
            <div className="mx-8 mt-4">
                <h4 className="text-3xl font-medium my-4">Bộ lọc</h4>
                <div className="text-2xl">
                    {
                        DATA_SIDEBAR_SEARCH.map((item,index) => {
                            return (
                                <Link to={`${item.path}?q=${query}`} key={index} className={cx("flex items-center py-4 pl-2 my-4 hover:bg-comment cursor-pointer",location.pathname === item.path ? 'bg-comment rounded-lg' : '')}>
                                    <FontAwesomeIcon 
                                        className={cx("w-8 h-8 p-4 rounded-full bg-comment",location.pathname === item.path ? 'bg-primaryColor text-white' : '')}
                                        icon={item.image}
                                    />
                                    <div className="ml-10 font-semibold">{item.name}</div>
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default SearchSidebar;