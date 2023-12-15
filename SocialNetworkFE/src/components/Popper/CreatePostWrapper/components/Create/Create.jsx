import classNames from "classnames/bind";
import styles from "./Create.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faClose, faEarthAmericas, faFileUpload, faUser, faUserGroup} from "@fortawesome/free-solid-svg-icons";
import useUserToken from "~/hook/user";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import images from "~/assets/images";
import Tippy from "@tippyjs/react";
import currentTime from "~/const/currentTime";
import { addMedia } from "~/redux/mediaSlice";
import { addPostMedia, addPosts } from "~/redux/postSlice";
import FountainLoader from "~/components/loader/components/fountain";
import Loader from "~/components/loader/loader";
function BoxCreate({onShow=undefined,forwardTo=undefined,valueDecentralization=''}) {
    const cx = classNames.bind(styles);
    const {nameUrlImageUser} = useUserToken();
    const state = useSelector(state => state.auth);
    const textareaRef = useRef();
    const [onChangeValuePost,setOnChangeValuePost] = useState('');
    const [isShowUploadPhoto,setIsShowUploadPhoto] = useState(false);
    const [isLoading,setIsLoading] = useState(true);
    const [pickListPhoto,setPickListPhoto] = useState([]);
    const {valueIdUser,upLoadFileToFireBase} = useUserToken();
    const dispatch = useDispatch();
    const stateMedia = useSelector(state => state.media);
    
    // HANDLE CHANGE VALUE POST
    const handleChangeValuePost = (e) => {
        setOnChangeValuePost(e.target.value);
    };

    //  HANDLE CHANGE FO WARD DECENTRALIZATION POST
    const handleChangeForwardDecentralization = () => {
        forwardTo(true);
    }

    // HANDEL CLICK CHOOSE UP LOAD PHOTO
    const handleClickChooseUploadPhoto =() => {
        if(pickListPhoto.length > 0) {
            setIsShowUploadPhoto(false);
        } else {
            setIsShowUploadPhoto(true);
        }
    }

    // HANDLE CLOSE CHOOSE UPLOAD FILE
    const handleCloseChooseUploadFile = () => {
        setIsShowUploadPhoto(false);
        setPickListPhoto([]);
    }

    // HANDLE CHANGE FILE PHOTO
    const handleChangeFilePhoto = (e) => {
        const selectedFile =e.target.files[0];
        console.log(selectedFile);
        if (selectedFile) {
            const fileType = selectedFile.type
            const reader = new FileReader();
            if (fileType.startsWith('image/')) {
                reader.onloadend = () => {
                    const ob = [...pickListPhoto,{file : selectedFile , url : reader.result , type : 'images'}];
                    setPickListPhoto(ob);
                    setIsShowUploadPhoto(false);
                };
                reader.readAsDataURL(selectedFile);
            } else if (fileType.startsWith('video/')) {
                console.log("video");
                reader.onloadend = () => {
                    const ob = [...pickListPhoto,{file : selectedFile , url : reader.result , type : 'videos'}];
                    setPickListPhoto(ob);
                    setIsShowUploadPhoto(false);
                };
                reader.readAsDataURL(selectedFile);
            }
        } else {
            console.log('Không có tệp tin được chọn');
        }
    };

    // GET ID DECENTRALIZATION
    const getIdDecentralization = (item) => {
        if(item === 'Công khai' || item === ''){
            return 1;
        } else if(item === 'Chỉ mình tôi'){
            return 2;
        } else if(item === 'Bạn bè'){
            return 3;
        }
    }

    // HANDLE ADD POST
    const handleAddPost = async (createdAt,valueContent,valueIdUser,valuePrivacy) => {
        try {
            if (createdAt && valueContent && valueIdUser && valuePrivacy) {
                const resp = await dispatch(addPosts({
                    createdAt: createdAt,
                    content: valueContent,
                    userId: valueIdUser,
                    privacyId: valuePrivacy
                }));
                return resp.payload;
            } else {
                return "Invalid input values";
            }
        } catch (error) {
            return "error";
        }
    };

    // HANDLE ADD MEDIA
    const handleAddMedia = async (valueIdUser,url,createdAt,type) =>{
        try {
            if(valueIdUser && url && createdAt && type){
                const resp = await dispatch(addMedia({
                    userId: valueIdUser,
                    mediaUrl: url,
                    mediaType: type === 'images' ? 'images' : 'videos',
                    createdAt: createdAt,
                    title: type === 'images' ? 'images' : 'videos',
                }));
                return resp.payload;
            } else {
                return "Invalid input values";
            }
        } catch (error) {
            return "error";
        }
    }

    // HANDLE ADD POST MEDIA
    const handleAddPostMedia = async (mediaId,postId) =>{
        try {
            if(mediaId && postId){
                const resp = await dispatch(addPostMedia({
                    media_id: mediaId,
                    post_id: postId
                }));
                return resp.payload;
            } else {
                return "Invalid input values";
            }
        } catch (error) {
            return "error";
        }
    }


    // HANDLE UP POSTS
    const handleClickUpPosts = (e) => {
        e.preventDefault();
        const createdAt = currentTime();
        const privacy = getIdDecentralization(valueDecentralization);
        handleAddPost(createdAt,onChangeValuePost,valueIdUser,privacy).then((object) => {
            console.log(object);
            setIsLoading(false);
            if(object && object.id > 0){
                if(pickListPhoto.length > 0){
                    pickListPhoto.map((item) => {
                        return upLoadFileToFireBase(valueIdUser,item.file,item.type).then((url) => {
                            if(url !== '' && url !== 'error upload'){
                                handleAddMedia(valueIdUser,url,createdAt,item.type).then((media) => {
                                    if(media && media.id > 0){
                                        handleAddPostMedia(media.id,object.id).then((msg) => {
                                            console.log(msg);
                                            if(msg?.message === "success"){
                                                setIsLoading(true);
                                                onShow(false);
                                            }
                                        })
                                    }
                                });
                            }
                        });
                    })
                } else {
                    setIsLoading(true);
                    onShow(false);
                }
            }     
        });
    }



    // FOCUS TEXTAREA
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
                        <img src={nameUrlImageUser} alt="user" className={cx('w-16 h-16 rounded-full object-cover')}/>
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
                    <div className={cx('wrapper__container-content-box',isShowUploadPhoto || pickListPhoto.length > 0 ? 'h-80' : '')}>
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
                                        <label className={cx('wrapper__container-content-box-choosePhoto-labelChoose')} htmlFor="choosePhoTo">
                                            <FontAwesomeIcon icon={faFileUpload}/>
                                            <h3>Thêm hình ảnh/video</h3>
                                        </label>
                                        <FontAwesomeIcon onClick={handleCloseChooseUploadFile} className={cx('wrapper__container-content-box-choosePhoto-iconClose')} icon={faClose} />
                                    </div>
                                </div>
                            ) :''
                        }
                        {
                            pickListPhoto.length > 0 ? (
                                <div className={cx('wrapper__container-content-box-choosePhoto')}>
                                    <div className="relative">
                                        <input type="file" id="addPhoto" onChange={handleChangeFilePhoto} hidden/>
                                        <label className={cx('wrapper__container-content-box-choosePhoto-labelAdd')} htmlFor="addPhoto">
                                            <h3 className="text-xl m-0 p-2">Thêm hình ảnh/video</h3>
                                        </label>
                                        <FontAwesomeIcon onClick={handleCloseChooseUploadFile} className={cx('wrapper__container-content-box-choosePhoto-iconClose')} icon={faClose} />
                                        <div className={cx('wrapper__container-content-box-choosePhoto-listPhotoOrVideo','grid justify-center grid-cols-1 gap-1')}>
                                            {
                                                pickListPhoto.length > 0 && pickListPhoto.map((item,index) => {
                                                    if(item.type === 'images') {
                                                        return <img className="my-2" key={index} src={item.url} alt={item.url}/>
                                                    } else if(item.type === 'videos'){
                                                        return (
                                                            <video key={index} className="w-full h-80" controls src={item.url} />
                                                        )
                                                    } else {
                                                        return ''
                                                    }
                                                })
                                            }
                                        </div>
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
                        className={cx(onChangeValuePost !== '' ? 
                                (!isLoading ? 'wrapper__container-content-btn-btnUnSelected' : 'wrapper__container-content-btn-btnSelected') 
                            : 'wrapper__container-content-btn-btnUnSelected',)}
                        onClick={handleClickUpPosts}
                    >
                        {isLoading ? 'Đăng' : <Loader/>}
                    </button>
                </div>
            </div>
        </form>
    );
}

export default BoxCreate;