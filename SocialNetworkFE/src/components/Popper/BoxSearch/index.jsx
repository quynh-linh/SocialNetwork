
import Tippy from '@tippyjs/react/headless'
import FlyOutsMenuItem from './BoxSearchMenuItem';
import classNames from 'classnames/bind';
import styles from './BoxSearch.module.scss';
import {Wrapper as PopperWrapper} from '~/components/Popper';
import Loader from '~/components/loader/loader';
import { useNavigate } from "react-router-dom";
function BoxSearch({items=[],children,title = '',state = false,isLoading = true,onClose=undefined}) {
    const cx = classNames.bind(styles);
    const navigate = useNavigate();
    
    const handleClickMenuItem = ({ userId }) => {
        if (userId) {
            onClose(false);
            navigate(`/profile?id=${userId}`);
        }
    };
    const showFlyOutsMenuitem = () => {
        return items.map((item,index) => <FlyOutsMenuItem onClick={(e) => handleClickMenuItem(e)} key={index} data={item}></FlyOutsMenuItem> )
    }
    return ( 
        <Tippy
            content= {title}
            visible = {state === true}
            interactive
            placement='bottom-start'
            appendTo={document.body}
            render={attrs => (
                <div className={cx('content','bg-background text-white')} tabIndex="-1" {...attrs}>
                    <PopperWrapper>
                        {
                            items.length <= 0 ? (
                                <h1>Không có tìm kiếm nào gần đây</h1>
                            ) : (
                                !isLoading ?
                                    showFlyOutsMenuitem()
                                : <Loader/>
                            )
                        }
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default BoxSearch;