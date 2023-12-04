import classNames from "classnames/bind";
import styles from "./CreatePostWrapper.module.scss";
import BoxCreate from "./components/Create/Create";
import { useEffect, useState } from "react";
import BoxDecentralization from "./components/Decentralization/Decentralization";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
function CreatePostWrapper({onShow=undefined,closeIsShow,isShow}) {
    const cx = classNames.bind(styles);
    const [isShowDecentralization,setIsShowDecentralization] = useState(false);
    const [isShowCreate,setIsShowCreate] = useState(true);
    const [valueDecentralization,setValueDecentralization] = useState('');

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        closeIsShow(false);
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: '#202227',
        boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
        minHeight: 350,
        borderRadius: '20px',
    };

    useEffect(() => {
        if(isShow){
            setOpen(true);
        } 
    },[isShow]);
    return (  
        <Modal
            open={open}
            onClose={handleClose}
            disableEnforceFocus
            disableAutoFocus
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className={cx('wrapper','flex items-center justify-center ')}>
                    {
                        isShowCreate ? (
                            <BoxCreate
                                onShow={(e) => {
                                    setOpen(e);
                                    onShow(e);
                                }}
                                forwardTo={(e) => {
                                    setIsShowDecentralization(e);
                                    setIsShowCreate(false);
                                }}
                                valueDecentralization={valueDecentralization !== '' ? valueDecentralization : ''}
                        />) : ''
                    }
                    {
                        isShowDecentralization ? (
                            <BoxDecentralization
                                forwardTo={(e) => {
                                    setIsShowCreate(e)
                                    setIsShowDecentralization(false);
                                }}
                                onConfirm={(e) => {
                                    setIsShowDecentralization(e.state);
                                    setIsShowCreate(true);
                                    if(e.decentralization === 'public'){
                                        setValueDecentralization('Công khai');
                                    }else if(e.decentralization === 'private'){
                                        setValueDecentralization('Chỉ mình tôi');
                                    }else if(e.decentralization === 'friends'){
                                        setValueDecentralization('Bạn bè');
                                    }
                                }}
                            />
                        ): ''
                    }
                </div>
            </Box>
        </Modal>
    );
}

export default CreatePostWrapper;