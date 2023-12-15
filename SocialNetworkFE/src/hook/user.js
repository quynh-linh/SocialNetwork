import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { v4 } from "uuid";
import { storage } from "~/config/firebase";
import currentTime from "~/const/currentTime";
import { getInfoUserByToken, getListUserFriends, updateImageUserDB } from "~/redux/authSlice";
import { addMedia, getListMedia } from "~/redux/mediaSlice";

function useUserToken() {
    const dispatch = useDispatch();
    const [valueIdUser,setValueIdUser] = useState();
    const [nameUrlImageUser,setNameUrlImageUser] = useState('');
    const [valueDetailUserById,setValueDetailUserById] = useState({});
    const [listMediaToUser,setListMediaToUser] = useState([]);
    const [listUserFriends,setListUserFriends] = useState([]);

    // INIT IS
    const [isLoadingMedia,setIsLoadingMedia] = useState(true);
    const [isLoadingGetListUserFriends,setIsLoadingGetListUserFriends] = useState(true);

    // REDUX TOOLKIT STATE
    const stateMedia = useSelector(state => state.media);
    const stateAuth = useSelector(state => state.auth);

    // UPLOAD IMAGE TO FIREBASE
    const upLoadFileToFireBase = (valueIdUser, imageUpload,typeFile) => {
        return new Promise((resolve, reject) => {
            const uuid = v4();
            const nameImage = imageUpload.name + uuid;
            const imageRef = ref(storage, `${typeFile}/${valueIdUser}/${nameImage}`);
            uploadBytes(imageRef, imageUpload)
                .then((upLoad) => getDownloadURL(upLoad.ref))
                .then((url) => {
                    if (url) {
                        resolve(url);
                    } else {
                        reject('error upload');
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    };
    // UPDATE IMAGE USER
    const updateImageUser = async (imageUpload) => {
        try {
            if(imageUpload !== null){
                const uuid = v4();
                const nameImage = imageUpload.name+ uuid;
                const createdAt = currentTime();
                const imageRef = ref(storage,`images/${valueIdUser}/${nameImage}`);
                const upLoad = await uploadBytes(imageRef,imageUpload);
                const url = await  getDownloadURL(upLoad.ref);
                if(valueIdUser !== '' && url !== '' && createdAt !==''){
                    const respAddMedia = await dispatch(addMedia({
                        userId: valueIdUser,
                        mediaUrl: url,
                        mediaType: 'images',
                        createdAt: createdAt,
                        title: 'Avatar',
                    }));
                    const msgAddMedia = respAddMedia.payload ? respAddMedia.payload : null;
                    if(msgAddMedia !== null && msgAddMedia.mediaUrl !== ''){
                        const respUpdate = await dispatch(updateImageUserDB({
                            image : msgAddMedia.mediaUrl,
                            id: valueIdUser
                        }));
                        const msg = respUpdate.payload ? respUpdate.payload.message : '';
                        if(msg === 'success update image') setNameUrlImageUser(msgAddMedia.mediaUrl);
                    }
                }
            }
        } catch (error) {
            console.log(error); 
        }
    }

    // GET LIST MEDIA TO USER
    const getListMediaToUser = (idUser, limit) => {
        dispatch(getListMedia({ id: idUser, limit }));
    };


    // GET LIST MEDIA TO USER
    const getListFriendsToUser = (idUser,limit) => {
        dispatch(getListUserFriends({id : idUser , limit : limit}));
    };

    // GET LIST MEDIA TO USER
    const getInfoUserByTokenToUser = async (token) => {
        try {
            const response = await dispatch(getInfoUserByToken(token));
            const ob = response.payload ? response.payload : '';
            const image = response.payload ? (response.payload.image ? response.payload.image : null) : null;
            if(ob) setValueDetailUserById(ob);
            if(ob.id) setValueIdUser(ob.id);
            if(image) setNameUrlImageUser(image);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token !== null){
            getInfoUserByTokenToUser(token);
        }
    },[dispatch]);

    useEffect(() => {
        if(stateMedia.listMediaByUser !== null && !stateMedia.isLoading){
            setListMediaToUser(stateMedia.listMediaByUser);
            setIsLoadingMedia(false);
        }
    },[stateMedia]);

    useEffect(() => {
        if(stateAuth.listFriends !== null && !stateAuth.isLoading){
            setListUserFriends(stateAuth.listFriends);
            setIsLoadingGetListUserFriends(false);
        }
    },[stateAuth]);

    return {
        // VALUE
            //  VALUE ID USER BY GET TOKEN
        valueIdUser,
            // VALUE URL IMAGE USER
        nameUrlImageUser,
            // VALUE LIST MEDIA TO USER
        listMediaToUser,
            // VALUE LIST USER FRIENDS
        listUserFriends,
            // VALUE DETAIL USER BY ID
        valueDetailUserById,
        // GET LIST
            // GET LIST FRIENDS TO USER
        getListFriendsToUser,
            // GET LIST MEDIA TO USER
        getListMediaToUser,
            // UP LOAD IMAGE TO FIREBASE
        upLoadFileToFireBase,
        // UPDATE
            // UPDATE AVATAR BY USER
        updateImageUser,
        // IS LOADING
            // IS LOADING MEDIA
        isLoadingMedia,
            // IS LOADING GET LIST USER FRIENDS
        isLoadingGetListUserFriends
    };
}
export default useUserToken;