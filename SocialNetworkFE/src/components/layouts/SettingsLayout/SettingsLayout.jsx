import classNames from "classnames/bind";
import styles from "./SettingsLayout.module.scss";
import Header from "../components/Header";
import { DATA_SETTINGS_MENU_CONTROL } from "~/const/data";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Toast } from "~/components/toast";
function SettingsLayout({children}) {
    const cx = classNames.bind(styles);
    const location = useLocation();

    const handleClickMenuItem = (item) => {
        if(!item.status){
            Toast({type:'info',title: item.name,position:'bottom-left',autoClose:1000,limit:1,des:'function'});
        }
    }
    return (  
        <div className={cx('wrapper')}>
            <Header/>
            <div className={cx('wrapper__content','flex')}>
                <div className={cx('wrapper__content-left',' bg-sidebar p-8')}>
                    <ul className={cx('')}>
                        {
                            DATA_SETTINGS_MENU_CONTROL.map((item,index)=>{
                                return (
                                    <li 
                                        onClick={() => handleClickMenuItem(item)} 
                                        key={index} 
                                        className={cx('p-3',location.pathname === item.path ? (item.status ? 'wrapper__content-left-selected' : '') : '')}
                                    > 
                                        <Link className="flex items-center" to={item.status ? item.path : ''}>
                                            <img className={cx('w-12 h-w-12')} src={item.image} alt="menu controle"/>
                                            <span className={cx("wrapper__content-left-name",'pl-10')}>{item.name}</span>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                <div className={cx('wrapper__content-right','p-8')}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default SettingsLayout;