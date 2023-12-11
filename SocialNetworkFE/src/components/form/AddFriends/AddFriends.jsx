import classNames from "classnames/bind";
import styles from "./AddFriends.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";
import useFriends from "~/hook/friends";
function AddFriends({data,type='',senderId=''}) {
    const cx = classNames.bind(styles);
    const { handleClickCancelRequest,handleClickConfirmRequest,valueResultRequest } = useFriends(data.id,senderId);
    
    return ( 
        type === 'add friends' ? (
            <div className={cx('wrapper','flex items-center justify-between')}>
                <div className={cx('wrapper-boxImg')}><img src={data.image} alt="Add user" className={cx('w-16 h-16','wrapper-img')}/></div>
                <div className={cx('wrapper-title')}>
                    <div className={cx('wrapper-name')}>{data.firstName + ' ' + data.lastName}</div>
                    {/* <div className={cx('wrapper-mutualFriends')}>60 bạn bè chung</div> */}
                </div>
                <div className={cx('wrapper-icon', data.accept ? 'wrapper-check' : '')}>
                    {
                        data.accept ? (
                            data.accept === 'True' 
                            ?  <FontAwesomeIcon className={cx('wrapper-add')} icon={faUserCheck}/>  
                            :  <FontAwesomeIcon className={cx('wrapper-add')} icon={faPlus}/>  
                        ) : <FontAwesomeIcon className={cx('wrapper-add')} icon={faPlus}/>  
                    }
                </div>
            </div>  
        ) : (
            <div className={cx('wrapper__request','flex')}>
                <img className={cx('w-1/5 h-28 object-cover rounded-xl')} alt="user" src={data.image}/>
                <div className={cx('wrapper__request-content','w-4/5 px-1')}>
                    <div className={cx('flex items-center justify-between')}>
                        <h1 className={cx('w-9/12')}>{data.firstName + ' ' + data.lastName}</h1>
                        <span className={cx('wrapper__request-content-createdAt')}>2 years</span>
                    </div>
                    {
                        data.id === valueResultRequest.id ? (
                            <div className={cx('wrapper__request-content-resultSend','bg-sidebar')}>
                               Đã {valueResultRequest.name === 'confirm' ? ' chấp nhận ' : ' đã xóa '} lời mời kết bạn của {data.last_name}
                            </div>
                        ) : (
                            <div className={cx('wrapper__request-btn')}>
                                <button 
                                    className={cx('wrapper__request-btn-confirm')} 
                                    onClick={handleClickConfirmRequest} 
                                    type="button"
                                >
                                    Xác nhận
                                </button>
                                <button 
                                    className={cx('wrapper__request-btn-cancel','ml-2')} 
                                    type="button"
                                    onClick={handleClickCancelRequest}
                                >
                                    Xóa
                                </button>
                            </div>
                        )
                    }
                </div>
            </div>
        )
    );
}

export default AddFriends;