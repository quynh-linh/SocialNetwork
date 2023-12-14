import classNames from "classnames/bind";
import styles from "./PeopleSearch.module.scss";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getListUserBySearch } from "~/redux/authSlice";
import Loader from "~/components/loader/loader";
import useUserToken from "~/hook/user";
function PeopleSearch() {
    const cx = classNames.bind(styles);
    const [listUserBySearch,setListUserBySearch] = useState([]);
    const [valueMessageSearch,setValueMessageSearch] = useState('');
    //
    const { search } = useLocation();
    const dispatch = useDispatch();
    const queryParams = new URLSearchParams(search);
    const query = queryParams.get('q');
    const stateAuth = useSelector(state => state.auth);
    
    useEffect(() => {
        if(query){
            dispatch(getListUserBySearch({name: query}));
        }
    },[query]);

    useEffect(() => {
        if(stateAuth.arrSearch.length > 0){
            setListUserBySearch(stateAuth.arrSearch);
        }
    },[stateAuth]);

    useEffect(() => {
        if(stateAuth.msg){
            setValueMessageSearch(stateAuth.msg);
        }
    },[stateAuth]);
    return (  
        <div  className={cx('wrapper','h-full overflow-y-auto')}>
            <div className="flex items-center justify-center">
                <div className="py-20 px-36 mb-20 w-full ">
                    {
                        valueMessageSearch === "null" ? (
                            <h1 className="text-color-text font-bold text-3xl text-center">Không tìm thấy kết quả phù hợp</h1>
                        )
                        : (listUserBySearch.length > 0 ? listUserBySearch.map((item) => {
                            return (
                                <div key={item.id} className="mt-6 w-full bg-comment rounded-2xl p-6 flex text-search">
                                    <img 
                                        className="w-32 h-32 rounded-full" 
                                        src={item.image} 
                                        alt="search people"
                                    />
                                    <div className="ml-10">
                                        <h1 className="font-bold text-3xl">{item.firstName+ " "+item.lastName}</h1>
                                        {item.address !== '' && (
                                            <span className="mt-5 text-xl font-medium text-start">Sống tại {item.address}</span>
                                        )}
                                        <div className="mt-4 flex items-center">
                                            <img className="w-10 h-10 rounded-full" src={item.image} alt="user"/>
                                            <span className="ml-4 text-xl font-medium">70 Bạn chung</span>
                                        </div>
                                    </div>
                                </div>
                            )
                        }) : <div className="mt-8"><Loader/></div>)
                    }
                    {
                        listUserBySearch.length > 0 && (
                            <div className="text-center text-color-text font-semibold text-xl mt-8">
                                <h1>Kết quả tìm kiếm chỉ bao gồm những nội dung hiển thị với bạn.</h1>
                                <h3 className="underline">Tìm hiểu thêm</h3>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default PeopleSearch;