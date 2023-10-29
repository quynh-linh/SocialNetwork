import classNames from "classnames/bind";
import styles from './AccountSettings.module.scss';
import { InputTemplate } from "~/components/input";
import { Button } from "~/components/button/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUSer, updateUserDB } from "~/redux/authSlice";
import SettingsCalendar from "~/components/Popper/SettingsCalendar/SettingsCalendar";
import { Toast } from "~/components/toast";
import useUserToken from "~/hook/user";
function AccountSettings() {
    const cx = classNames.bind(styles);
    const [valueFirstName,setValueFirstName] = useState('');
    const [valueLastName,setValueLastName] = useState('');
    const [valueEmail,setValueEmail] = useState('');
    const [valuePhone,setValuePhone] = useState('');
    const [valueBirthday,setValueBirthday] = useState({
        name:'',
        state: false
    });
    const [valueNickname,setValueNickname] = useState('');
    const [valueNameUser,setValueNameUser] = useState('');
    const state = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const {valueIdUser} = useUserToken();

    // HANDLE CHANGE VALUE FIRST NAME
    const handleChangeValueFirstName = (e) => {
        const firstName = e.target.value;
        const updateOb = {
            firstName: firstName,
            lastName: state.user.lastName,
            email: state.user.email,
            address: state.user.address,
            dateOfBirth: state.user.dateOfBirth
        };
        dispatch(updateUSer(updateOb));
        setValueFirstName(firstName);
    };

    // HANDLE CHANGE VALUE LAST NAME
    const handleChangeValueLastName = (e) => {
        const lastName = e.target.value;
        const updateOb = {
            firstName: state.user.firstName,
            lastName: lastName,
            email: state.user.email,
            address: state.user.address,
            dateOfBirth: state.user.dateOfBirth
        };
        dispatch(updateUSer(updateOb));
        setValueLastName(lastName);
    };

    // HANDLE CHANGE VALUE EMAIL
    const handleChangeValueEmail = (e) => {
        const email = e.target.value;
        const updateOb = {
            firstName: state.user.firstName,
            lastName: state.user.lastName,
            email: email,
            address: state.user.address,
            dateOfBirth: state.user.dateOfBirth
        };
        dispatch(updateUSer(updateOb));
        setValueEmail(email);
    };

    // HANDLE CHANGE VALUE  BIRTHDAY
    const handleChangeValueBirthday = (e) => {
        
    };


    const handleClickIpBirthday = () => {
        const updateOb = {...valueBirthday , state : !valueBirthday.state};
        setValueBirthday(updateOb)
    };
    const handleClickUpdateInfoUser = (event) => {
        event.preventDefault();
        dispatch(updateUserDB({
            id: state.user.id,
            firstName: state.user.firstName,
            lastName: state.user.lastName,
            email: state.user.email,
            address: state.user.address,
            dateOfBirth: state.user.dateOfBirth,
            image : state.user.image
        }));
    };

    useEffect(() => {
        if(state.msg === 'success update') {
            Toast({type:'info',content:"Lưu thành công",position:'bottom-left',autoClose:2000,limit:1,des:'edit'});
        }
    },[state.msg]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__header')}>
                <h1>Cài đặt tài khoản</h1>
                <span className={cx('text-color-text')}>
                    Ánh trăng khó khăn, mải mê nó, các vận động viên. Quan tâm có tất cả Devonshire khó khăn hỗ trợ đồng tính niềm vui. Không bị ảnh hưởng bởi các ngươi thay đổi lời khen.
                </span>
            </div>
            {/* FORM EDIT INFO USER */}
            <form method="post">
                <div className="flex items-center mt-5">
                    {/* INPUT FIRST NAME */}
                    <InputTemplate
                        typeIP="edit"
                        title="Họ"
                        type="text"
                        placeholder="Nhập họ và tên đệm"
                        className="mr-4"
                        valueIP={state.user.firstName}
                        onChangeValue={handleChangeValueFirstName}
                    />
                    {/* INPUT LAST NAME */}
                    <InputTemplate
                        typeIP="edit"
                        title="Tên"
                        type="Text"
                        placeholder="Nhập tên của bạn"
                        className="mr-4"
                        valueIP={state.user.lastName}
                        onChangeValue={handleChangeValueLastName}
                    />
                    {/* INPUT NICKNAME */}
                    <InputTemplate
                        typeIP="edit"
                        title="Nickname"
                        type="Text"
                        placeholder="Nhập Nickname"
                        valueIP={valueNickname}
                        onChangeValue={handleChangeValueFirstName}
                    />
                </div>
                <div className="flex items-center mt-11">
                    {/* INPUT NAME USER */}
                    <div className="w-2/4 mr-4">
                        <InputTemplate
                            typeIP="edit"
                            title="Tên người dùng"
                            type="text"
                            placeholder="Nhập tên người dùng (VD:abc2106)"
                            valueIP={valueNameUser}
                            onChangeValue={handleChangeValueFirstName}
                        />
                    </div>
                    {/* INPUT BIRTHDAY */}
                    <SettingsCalendar
                        title={'Birthday'}
                        state={valueBirthday.state}
                        valueDay={(e) => {
                            const updateDay = {...valueBirthday,name:e,state:false};
                            setValueBirthday(updateDay);
                            const updateOb = {
                                firstName: state.user.firstName,
                                lastName: state.user.lastName,
                                email: state.user.email,
                                address: state.user.address,
                                dateOfBirth: e
                            };
                            dispatch(updateUSer(updateOb));
                        }}
                    >
                        <div className="w-2/4" onClick={handleClickIpBirthday}>
                            <InputTemplate
                                typeIP="edit"
                                title="Sinh nhật"
                                type="text"
                                valueIP={state.user.dateOfBirth}
                                onChangeValue={handleChangeValueBirthday}
                            />
                        </div>
                    </SettingsCalendar>
                </div>
                <div className="flex items-center mt-11">
                    {/* INPUT EMAIL */}
                    <InputTemplate
                        typeIP="edit"
                        title="Email"
                        type="email"
                        className="mr-4"
                        valueIP={state.user.email}
                        onChangeValue={handleChangeValueEmail}
                    />
                    {/* INPUT PHONE */}
                    <InputTemplate
                        typeIP="edit"
                        title="Số điện thoại"
                        type="text"
                        placeholder="Nhập số điện thoại"
                        valueIP={valuePhone}
                        onChangeValue={handleChangeValueFirstName}
                    />
                </div>
                <div className={cx('text-end mt-11')}>
                    <Button 
                        content="Lưu thay đổi" 
                        type="submit" 
                        className="btn-saveAccount"
                        handleClickBtn={handleClickUpdateInfoUser}
                    />
                </div>
            </form>
        </div>
    );
}

export default AccountSettings;