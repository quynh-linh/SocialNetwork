
import classNames from 'classnames/bind';
import styles from './FlyOutsLike.module.scss';
import 'tippy.js/dist/tippy.css'; 
import {Wrapper as PopperWrapper} from '~/components/Popper';
import { useEffect, useState } from 'react';
import Tippy from '@tippyjs/react/headless'
function FlyOutsLike({state = false , data, children , title}) {
    const cx = classNames.bind(styles);
    const [open,setOpen] = useState(false);

    useEffect(() => {
        setOpen(state);
    },[state])

    return ( 
        <Tippy
            content= {title}
            visible = {open}
            interactive
            placement='bottom-start'
            appendTo={document.body}
            render={attrs => (
                <div className={cx('content','bg-white')}>
                    <PopperWrapper>
                        <ul>
                            {
                                data && data.map((item,index) => {
                                    return <li key={index} className='text-xl font-medium px-4 py-2'>{item.firstName + ' ' + item.lastName}</li>
                                })
                            }
                        </ul>
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default FlyOutsLike;