import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faClose, faEarthAmericas, faFileUpload, faUser, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import useUserToken from "~/hook/user";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import images from "~/assets/images";
import Tippy from "@tippyjs/react";
import { faFile } from "@fortawesome/free-regular-svg-icons";
function BoxCreate({onShow=undefined,forwardTo=undefined,valueDecentralization=''}) {
    const cx = classNames.bind(styles);
    const {nameUrlImageUser} = useUserToken();
    const state = useSelector(state => state.auth);
    const textareaRef = useRef();
    const [onChangeValuePost,setOnChangeValuePost] = useState('');
    const [isShowUploadPhoto,setIsShowUploadPhoto] = useState(false);
    const [valueUrlChooseFilePhoto,setValueUrlChooseFilePhoto] =  useState({
        file : '',
        url : '',
    });
    const [valueUrlChooseFileVideo,setValueUrlChooseFileVideo] =  useState('');
    //
    const handleChangeValuePost = (e) => {
        setOnChangeValuePost(e.target.value);
    };

    const handleChangeForwardDecentralization = () => {
        forwardTo(true);
    }

    const handleClickChooseUploadPhoto =() => {
        setIsShowUploadPhoto(true);
    }

    const handleCloseChooseUploadFile = () => {
        setIsShowUploadPhoto(false);
        setValueUrlChooseFilePhoto({...valueUrlChooseFilePhoto , file : '' , url : ''});
    }

    const handleChangeFilePhoto = (e) => {
        const selectedFile =e.target.files[0];
        if (selectedFile) {
            const fileType = selectedFile.type
    
            if (fileType.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setValueUrlChooseFilePhoto({...valueUrlChooseFilePhoto,file : selectedFile , url : reader.result});
                    setIsShowUploadPhoto(false);
                };
                reader.readAsDataURL(selectedFile);
            } else if (fileType.startsWith('video/')) {
                setValueUrlChooseFileVideo(selectedFile.name);
            }
        } else {
            console.log('Không có tệp tin được chọn');
        }
       
    };
    
    //
    useEffect(() => {
        textareaRef.current.focus();
    },[]);
    return (  
        <form method="POST" className={cx('wrapper__container','relative')}>
            <div className={cx('animation')}>
                <div className={cx('wrapper__container-header','flex items-center relative justify-center py-8')}>
                    <h1>Tạo bài viết</h1>
                    <FontAwesomeIcon
                        className={cx('wrapper__container-header-icon')}
                        icon={faClose}
                        onClick={() => onShow(false)}
                    />
                </div>
                <div className={cx('wrapper__container-content','p-5')}>
                    <div className="flex items-center">
                        <img src={nameUrlImageUser} alt="user" className={cx('w-16 h-16 rounded-full')}/>
                        <div className={cx('ml-4')}>
                            <h1>{state.user.firstName +" " + state.user.lastName}</h1>
                            <div
                                className={cx('wrapper__container-content-role','flex items-center justify-between mt-1')}
                                onClick={handleChangeForwardDecentralization}
                            >
                                {
                                    valueDecentralization === '' ?(
                                        <FontAwesomeIcon icon={faEarthAmericas}/>
                                    ) : ''
                                }
                                {
                                    valueDecentralization !== '' && valueDecentralization === 'Công khai' && (
                                        <FontAwesomeIcon icon={faEarthAmericas}/>
                                    )
                                }
                                {
                                    valueDecentralization !== '' && valueDecentralization === 'Chỉ mình tôi' && (
                                        <FontAwesomeIcon icon={faUser}/>
                                    )
                                }
                                {
                                    valueDecentralization !== '' && valueDecentralization === 'Bạn bè' && (
                                        <FontAwesomeIcon icon={faUserGroup}/>
                                    )
                                }
                                <p className="mx-4">{valueDecentralization !== '' ? valueDecentralization : 'Công khai'}</p>
                                <FontAwesomeIcon icon={faChevronDown}/>
                            </div>
                        </div>
                    </div>
                    <div className={cx('wrapper__container-content-box',isShowUploadPhoto || valueUrlChooseFilePhoto.url !== '' ? 'h-80' : '')}>
                        <textarea
                            className={cx('wrapper__container-content-box-input','mt-4')}
                            rows="3"
                            cols="50"
                            placeholder={state.user && state.user.lastName !== '' ? state.user.lastName +" ơi," +" bạn đang nghĩ gì thế !" : ''}
                            ref={textareaRef}
                            onChange={handleChangeValuePost}
                        >
                        </textarea>
                        {
                            isShowUploadPhoto ? (
                                <div className={cx('wrapper__container-content-box-choosePhoto')}>
                                    <div className="relative">
                                        <input type="file" id="choosePhoTo" onChange={handleChangeFilePhoto} hidden/>
                                        <label htmlFor="choosePhoTo">
                                            <FontAwesomeIcon icon={faFileUpload}/>
                                            <h3>Thêm hình ảnh/video</h3>
                                        </label>
                                        <FontAwesomeIcon onClick={handleCloseChooseUploadFile} className={cx('wrapper__container-content-box-choosePhoto-iconClose')} icon={faClose} />
                                    </div>
                                </div>
                            ) :''
                        }
                        {
                            valueUrlChooseFilePhoto.url !== '' ? (
                                <div className={cx('wrapper__container-content-box-choosePhoto')}>
                                    <div className="relative">
                                        <FontAwesomeIcon onClick={handleCloseChooseUploadFile} className={cx('wrapper__container-content-box-choosePhoto-iconClose')} icon={faClose} />
                                        <img src={valueUrlChooseFilePhoto.url} alt={valueUrlChooseFilePhoto}/>
                                    </div>
                                </div>
                            ) :''
                        }
                        
                    </div>
                    <div className={cx('wrapper__container-content-addControlToPost','flex items-center justify-between')}>
                        <h3 className="text-xl font-semibold">Thêm vào bài viết của bạn</h3>
                        <div className="flex items-center justify-center">
                            <Tippy content='Hình ảnh/Video'>
                                <img 
                                    className="w-10 h-10 mx-4 cursor-pointer" 
                                    src={images.uploadPhoto} 
                                    alt={images.uploadPhoto}
                                    onClick={handleClickChooseUploadPhoto}
                                />
                            </Tippy>
                            <Tippy content='Sự kiện'>
                                <img className="w-10 h-10 mx-4 cursor-pointer" src={images.uploadEvent} alt={images.uploadEvent}/>
                            </Tippy>
                            <Tippy content='Cảm xúc/Hoạt động'>
                                <img className="w-10 h-10 mx-4 cursor-pointer" src={images.uploadFeeling} alt={images.uploadPhoto}/>
                            </Tippy>
                        </div>
                    </div>
                </div>
                <div className={cx('wrapper__container-content-btn')}>
                    <button
                        type="submit"
                        className={cx(onChangeValuePost !== '' ? 'wrapper__container-content-btn-btnSelected' : 'wrapper__container-content-btn-btnUnSelected',)}
                    >
                        Đăng
                    </button>
                </div>
            </div>
        </form>
    );
}

export default BoxCreate;