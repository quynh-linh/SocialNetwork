import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { v4 } from "uuid";
import { storage } from "~/config/firebase";
import { getInfoUserByToken, updateImageUserDB } from "~/redux/authSlice";

function useUserToken() {
    const dispatch = useDispatch();
    const [valueIdUser,setValueIdUser] = useState();
    const [nameUrlImageUser,setNameUrlImageUser] = useState('');

    const updateImageUser = (imageUpload) => {
        if(imageUpload !== null){
            const uuid = v4();
            const nameImage = imageUpload.name+ uuid;
            const imageRef = ref(storage,`images/${nameImage}`);
            uploadBytes(imageRef,imageUpload).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    dispatch(updateImageUserDB({
                        image : url,
                        id: valueIdUser
                    })).then((item) =>{
                        const msg = item.payload ? item.payload.message : '';
                        if(msg === 'success update image') setNameUrlImageUser(url);
                    });
                })
            })
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token !== null){
            dispatch(getInfoUserByToken(token)).then((item) => {
                const id = item.payload ? item.payload.id : '';
                const image = item.payload ? (item.payload.image ? item.payload.image : null) : null;
                if(id) setValueIdUser(id);
                if(image) setNameUrlImageUser(image);
            });
            
        }
    },[dispatch]);

    return {valueIdUser,nameUrlImageUser,updateImageUser};
    
}

export default useUserToken;