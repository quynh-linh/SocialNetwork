import classNames from 'classnames/bind';
import styles from "./RequestSent.module.scss";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import useUserToken from '~/hook/user';
import { useEffect, useState } from 'react';
import { getListUserRequestSent} from '~/redux/authSlice';
import { useDispatch } from 'react-redux';
import images from '~/assets/images';
import useFriends from '~/hook/friends';
function RequestSent({onClose=undefined}) {
    const cx = classNames.bind(styles);
    const [listDataRequestFriends, setListDataRequestFriends] = useState([]);
    const { handleExitsRequest,valueResultRequest } = useFriends();
    const {valueIdUser} = useUserToken();
    const dispatch = useDispatch();

    const handleClickExitsRequest = (receiverId)=>{
        if(valueIdUser && receiverId){
            handleExitsRequest(receiverId,valueIdUser);
        }
    }
    const handleCloseRequestSent = () =>{
        onClose(false);
    };

    useEffect(() => {    
        if(valueIdUser){
            dispatch(getListUserRequestSent({id : valueIdUser , limit : 50})).then((item) => {
                if(item && item.payload && !item.payload.message){
                    setListDataRequestFriends(item.payload)
                }
            })
        }
       
    },[dispatch,valueIdUser]);
    return (  
        <div className={cx('wrapper','flex items-center justify-center')}>
            <div className={cx('wrapper__content','text-white ')}>
                <header className='flex items-center justify-center relative py-7'>
                    <h1>Lời mời đã gửi</h1>
                    <FontAwesomeIcon 
                        className={cx('wrapper__content-header-icon')} 
                        icon={faClose}
                        onClick={handleCloseRequestSent}
                    />
                </header>
                <div className={cx(listDataRequestFriends.length === 0 ? 'wrapper__content-null' : '')}>
                    {listDataRequestFriends.length > 0 ? (<h3 className='text-2xl font-medium pl-8 py-5'>{listDataRequestFriends.length+' '} lời mời đã gửi</h3>) : ''}
                    {
                        listDataRequestFriends.length > 0 ? listDataRequestFriends.map((item,index) => {
                            return  (
                                <div key={index} className={cx('wrapper__content-request','py-3 px-1 flex items-center justify-between')}>
                                    <div className='flex items-center w-3/5'>
                                        <img className={cx('w-1/5 h-28 object-cover rounded-xl ml-5')} alt={item.first_name} src={item.image}/>
                                        <div className={cx('wrapper__content-request-info','w-4/5 px-1 ml-3')}>
                                            <div className={cx('flex items-center justify-between')}>
                                                <h1 className={cx('w-9/12 font-semibold')}>{item.firstName + ' ' + item.lastName}</h1>
                                            </div>
                                            <div className='flex items-center mt-3'>
                                                <img className='w-8 h-w-8 rounded-full' src={images.user} alt='cccc'/>
                                                <img className='w-8 h-w-8 rounded-full' src={images.uploadVideo} alt='cccc'/>
                                                <img className='w-8 h-w-8 rounded-full' src={images.groups} alt='cccc'/>
                                                <span className='ml-3 text-xl'>3 bạn chung</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        className={cx('wrapper__content-request-btn','w-2/6 p-4 mr-6')} 
                                        onClick={() => handleClickExitsRequest(item.id)}
                                        type='button'
                                    >
                                        {valueResultRequest.id === item.id ? 'Đã hủy yêu cầu kết bạn' : 'Hủy yêu cầu'}
                                    </button>
                                </div>
                            )
                        }) : <div className='text-2xl text-center p-5'>Bạn chưa gửi lời mời kết bạn nào.</div>
                    }
                </div>
            </div>
        </div>
    );
}

export default RequestSent;