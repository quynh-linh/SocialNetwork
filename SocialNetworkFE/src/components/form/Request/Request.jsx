import classNames from "classnames/bind";
import styles from "./Request.module.scss";
import useFriends from "~/hook/friends";
function RequestFriends({data,senderId='',type=''}) {
    const cx = classNames.bind(styles);
    const { handleClickCancelRequest,handleClickConfirmRequest,handleAddFriendsRequest,valueResultRequest } = useFriends(data.id,senderId);
    
    return ( 
        <form className={cx('form')} method="POST">
            <img className={cx('form__imgUser')} src={data.image} alt="Request Friends"/>
            <div className={cx('form__content')}>
                <h2>{data.firstName+ ' ' + data.lastName}</h2>
                <div className={cx('form__content-mutualFriends')}>
                    <span>60 bạn chung</span>
                </div>
                {
                    type === 'request' && (
                        data.id && data.id === valueResultRequest.id ? (
                            <div className={cx('form__content-resultSend','bg-sidebar')}>
                               Đã {valueResultRequest.name === 'confirm' ? ' chấp nhận ' : ' đã xóa '} lời mời kết bạn của {data.last_name}
                            </div>
                        ) : (
                            <div>
                                <div className={cx('form__content-btnConfirm')}>
                                    <button onClick={handleClickConfirmRequest} type="button">Xác nhận</button>
                                </div>
                                <div className={cx('form__content-btnCancel','bg-sidebar')}>
                                    <button onClick={handleClickCancelRequest} type="button">Xóa</button>
                                </div>
                            </div>
                        )
                    )
                }
                {
                    type === 'suggestions' && (
                        data.id && data.id === valueResultRequest.id ? (
                            <div className={cx('form__content-resultSend','bg-sidebar')}>
                               Đã {valueResultRequest.name === 'add' ? 'gửi yêu cầu ' : ''}kết bạn đến {data.last_name}
                            </div>
                        ) : (
                            <div>
                                <div className={cx('form__content-btnConfirm')}>
                                    <button onClick={handleAddFriendsRequest} type="button">Thêm bạn bè</button>
                                </div>
                                <div className={cx('form__content-btnCancel','bg-sidebar')}>
                                    <button onClick={handleClickCancelRequest} type="button">Xóa,gỡ</button>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        </form>
    );
}

export default RequestFriends;