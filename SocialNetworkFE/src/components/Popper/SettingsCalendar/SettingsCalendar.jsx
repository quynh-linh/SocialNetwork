
import Tippy from '@tippyjs/react/headless';
import classNames from 'classnames/bind';
import styles from './SettingsCalendar.module.scss';
import 'tippy.js/dist/tippy.css'; 
import {Wrapper as PopperWrapper} from '~/components/Popper';
import BasicDatePicker from '~/components/DatePicker/BasicDatePicker';
import { useEffect, useState } from 'react';
function SettingsCalendar({children,title = '',state = false , valueDay=undefined}) {
    const cx = classNames.bind(styles);
    const [valueSelectedDate , setValeSelectedDate] = useState('');

    //
    useEffect(() =>{
        valueDay(valueSelectedDate);
    },[valueSelectedDate])
    return (  
        <Tippy
        content= {title}
        visible = {state === true}
        interactive
        placement='top-start'
        appendTo={document.body}
        render={attrs => (
            <div className={cx('content','bg-white')} tabIndex="-1" {...attrs}>
                <PopperWrapper>
                   <BasicDatePicker valueDate={(e) => setValeSelectedDate(e)}/>
                </PopperWrapper>
            </div>
        )}
        >
            {children}
        </Tippy>
    );
}

export default SettingsCalendar;