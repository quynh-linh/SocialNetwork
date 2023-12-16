import className from 'classnames/bind';
import styles from "./BoxSearch.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
function FlyOutsMenuItem({data, onClick=undefined}) {
    const cx = className.bind(styles);
    const handleClickBox = () =>{
        onClick(data)
    }
    return (
        <div className={cx('menu-box','flex items-center justify-between p-5')} onClick={handleClickBox}>
            <div className='flex items-center'>
                <FontAwesomeIcon className={cx('menu-box-iconSearch')} icon={faSearch}/>
                <div className='ml-4'>
                    <h2 className='text-2xl font-semibold'>{data.firstName + " " + data.lastName}</h2>
                    {data.address !== '' && (<span className='text-xl font-medium'>Đang sống tại {data.address}</span>)}
                </div>
            </div>
            <img className='w-16 h-16 rounded-full' src={data.avatar} alt='user'/>
        </div>
    );
}

export default FlyOutsMenuItem;