
import Tippy from '@tippyjs/react/headless'
import FlyOutsMenuItem from './FlyoutsMenuItem';
import classNames from 'classnames/bind';
import styles from './FlyoutsMenu.module.scss';
import {Wrapper as PopperWrapper} from '~/components/Popper';
function FlyOutsMenu({items,children,title = '',state = false}) {
    const cx = classNames.bind(styles);
    const handleClickMenuItem = () => {

    };
    const showFlyOutsMenuitem = () => {
        return items.map((item,index) => <FlyOutsMenuItem onClick={handleClickMenuItem} key={index} data={item}></FlyOutsMenuItem> )
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
                        {showFlyOutsMenuitem()}
                    </PopperWrapper>
                </div>
            )}
        >
            {children}
        </Tippy>
    );
}

export default FlyOutsMenu;