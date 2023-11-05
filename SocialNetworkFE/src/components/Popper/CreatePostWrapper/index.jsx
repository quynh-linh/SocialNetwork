import classNames from "classnames/bind";
import styles from "./CreatePostWrapper.module.scss";
import BoxCreate from "./components/Create/Create";
import { useState } from "react";
import BoxDecentralization from "./components/Decentralization/Decentralization";
function CreatePostWrapper({onShow=undefined}) {
    const cx = classNames.bind(styles);
    const [isShowDecentralization,setIsShowDecentralization] = useState(false);
    const [isShowCreate,setIsShowCreate] = useState(true);
    const [valueDecentralization,setValueDecentralization] = useState('');
    return (  
        <div className={cx('wrapper','flex items-center justify-center')}>
            {
                isShowCreate ? (
                    <BoxCreate 
                        onShow={(e) => onShow(e)}
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
    );
}

export default CreatePostWrapper;