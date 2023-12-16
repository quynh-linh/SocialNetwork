import AuthForm from "~/components/form/auth/authForm";
import classNames from "classnames/bind";
import styles from "./Register.module.scss";
import 'tippy.js/dist/tippy.css'; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Tippy from "@tippyjs/react";
import { useEffect, useState } from "react";
import { checkPasswordHeight, checkPasswordLow, checkPasswordMedium } from "~/const/checkPassWord";
import { useDispatch, useSelector } from "react-redux";
import { signUpUser } from "~/redux/authSlice";
import { InputTemplate } from "~/components/input";
import { isValidEmail } from "~/const/checkEmail";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "~/config/firebase";
function Register() {
    const cx = classNames.bind(styles);
    const [checkSafetyPassWord,setCheckSafetyPassWord] = useState('');
    // LOG CHECK LOGIC
    const [logCheckFirstName,setLogCheckFirstName] = useState({
        title : 'Họ và tên đệm của bạn',
        state: null
    });
    const [logCheckLastName,setLogCheckLastName] = useState({
        title : 'Tên của bạn',
        state: null
    });
    const [logCheckPassWord,setLogCheckPassWord] = useState({
        title : 'Nhập mật khẩu của bạn...',
        level: null,
        state:null
    });
    const [logCheckConfirmPassWord,setLogCheckConfirmPassWord] = useState({
        title : 'Nhập lại mật khẩu',
        state : null
    });
    const [logCheckEmail,setLogCheckEmail] = useState({
        title : 'Chúng tôi sẽ không bao giờ chia sẻ email của bạn với bất kỳ ai khác.',
        state : null
    });
    //
    const [isShowStrengthMeter,setShowStrengthMeter] = useState(false);
    const [isLoading,setLoading] = useState(false);
    const dispatch = useDispatch();
    const state = useSelector(state =>  state.auth);
    //const navigate = useNavigate();
    // 
    const [valueEmailUser,setValueEmailUser] = useState('');
    const [valuePasswordUser,setValuePasswordUser] = useState('');
    const [valueConfirmPasswordUser,setValueConfirmPasswordUser] = useState('');
    const [valueFirstNameUser,setValueFirstNameUser] = useState('');
    const [valueLastNameUser,setValueLastNameUser] = useState('');

    // HANDLE LOGIC CHANGE VALUE EMAIL
    const handleChangeValueEmail = (e) => {
        const email = e.target.value;
        if(email !== ''){
            if(isValidEmail(email)){
                const updateEmail = {...logCheckConfirmPassWord, title : 'Email hợp lệ' , state: true}
                setLogCheckEmail(updateEmail);
                setValueEmailUser(e.target.value);
            } else {
                const updateEmail = {...logCheckConfirmPassWord, title : 'Định dạng email không hợp lệ' , state: false}
                setLogCheckEmail(updateEmail);
            }
        } else {
            const updateEmail = {...logCheckConfirmPassWord, title : 'Chúng tôi sẽ không bao giờ chia sẻ email của bạn với bất kỳ ai khác.' , state: null}
            setLogCheckEmail(updateEmail);
        }
    };

    // HANDLE CONFIRM PASSWORD
    const handleConfirmPassword = (e) => {
        const pass = e.target.value;
        setValueConfirmPasswordUser(pass);
        if(pass !== ''){
            if(valuePasswordUser !== ''){
                if(pass === valuePasswordUser) {
                    const updateConfirm = {...logCheckConfirmPassWord, title : 'Mật khẩu trùng khớp' , state: true}
                    setLogCheckConfirmPassWord(updateConfirm);
                } else {
                    const updateConfirm = {...logCheckConfirmPassWord, title : 'Mật khẩu không trùng khớp' , state: false}
                    setLogCheckConfirmPassWord(updateConfirm);
                }
            } else {
                const updateConfirm = {...logCheckConfirmPassWord, title : 'Bạn chưa nhập mật khẩu!' , state: false}
                setLogCheckConfirmPassWord(updateConfirm);
            }
        } else {
            const updateConfirm = {...logCheckConfirmPassWord, title : 'Nhập lại mật khẩu của bạn...' , state: null}
            setLogCheckConfirmPassWord(updateConfirm);
        }
    }

    // HANDLE CHANGE PASSWORD AND HANDLE LEVEL PASSWORD
    const handleChangePassword = (e)=> {
        setShowStrengthMeter(true);
        const valuePass = e.target.value;
        if(valuePass ===''){
            const updateLog = {...logCheckPassWord , title : 'Nhập mật khẩu của bạn...'  , level : null}
            setCheckSafetyPassWord('');
            setLogCheckPassWord(updateLog);
            setShowStrengthMeter(false);
        } else {
            if(!checkPasswordLow(valuePass)){
                const updateLog = {...logCheckPassWord , title : 'Mật khẩu quá dễ!'  , level : 'low' , state: false}
                setCheckSafetyPassWord('container__content-strengthLevelLow');
                setLogCheckPassWord(updateLog);
            } 
            if(checkPasswordMedium(valuePass)){
                const updateLog = {...logCheckPassWord , title : 'Đó là một điều đơn giản!'  , level : 'medium' , state: true}
                setCheckSafetyPassWord('container__content-strengthLevelMedium');
                setLogCheckPassWord(updateLog);
                setValuePasswordUser(valuePass);
            }  
            if(checkPasswordHeight(valuePass)) {
                const updateLog = {...logCheckPassWord , title : 'Vâng! mật khẩu đó tuyệt vời!'  , level : 'high' , state: true}
                setCheckSafetyPassWord('container__content-strengthLevelHeight');
                setLogCheckPassWord(updateLog);
                setValuePasswordUser(valuePass);
            }
        }
    }

    // HANDLE CHANGE FIRST NAME USER
    const handleChangeFirstName = (e) => {
        const first = e.target.value;
        const updateLog = {...logCheckFirstName , title: 'Họ và tên đệm của bạn' , state: null};
        setValueFirstNameUser(first);
        setLogCheckFirstName(updateLog);
    };

    // HANDLE CHANGE LAST NAME USER
    const handleChangeLastName = (e) => {
        setValueLastNameUser(e.target.value);
        const updateLog = {...logCheckLastName , title: 'Tên của bạn' , state: null};
        setLogCheckLastName(updateLog);
    }

    // HANDLE LOGIC CLICK ADD USER
    const handleClickAddUser = (event) => {
        event.preventDefault();
        if(valueEmailUser === ''){
            const updateLog = {...logCheckConfirmPassWord, title : 'Bạn cần phải nhập email!' , state: false};
            setLogCheckEmail(updateLog);
        }
        if(valuePasswordUser === ''){
            const updateLog = {...logCheckPassWord, title : 'Bạn cần phải nhập mật khẩu!' , state:false , level: 'low'};
            setLogCheckPassWord(updateLog);
        }
        if(valueFirstNameUser === ''){
            const updateLog = {...logCheckFirstName, title : 'Nhập họ của bạn' , state: false};
            setLogCheckFirstName(updateLog);
        }
        if(valueLastNameUser === ''){
            const updateLog = {...logCheckLastName, title : 'Nhập tên của bạn' , state: false};
            setLogCheckLastName(updateLog);
        }
        if(valueConfirmPasswordUser === ''){
            const updateLog = {...logCheckLastName, title : 'Bạn chưa nhập mật khẩu' , state: false};
            setLogCheckConfirmPassWord(updateLog);
        }
        if(valueEmailUser !== '' && valuePasswordUser !== '' && valueFirstNameUser !== ''
            && valueLastNameUser !== '' && valueConfirmPasswordUser !== ''){
            dispatch(signUpUser({
                "id": '',
                "firstName": valueFirstNameUser,
                "lastName": valueLastNameUser,
                "email": valueEmailUser,
                "password": valuePasswordUser,
                "address": '',
                "dateOfBirth": '',
                "image" : 'https://firebasestorage.googleapis.com/v0/b/socialnerwork-ac060.appspot.com/o/images%2Ffemale-avatar-girl-face-woman-user-4-svgrepo-com.png?alt=media&token=7474df74-51a1-4587-a4b8-ac9d465b8583&_gl=1*1thcfg4*_ga*MTA5MzA0MDc1My4xNjk4MTI4NTU0*_ga_CW55HF8NVT*MTY5ODEzOTE5Mi4zLjEuMTY5ODE0NDY3Ni41MC4wLjA.'
            }));
            setLogCheckEmail({
                title : 'Chúng tôi sẽ không bao giờ chia sẻ email của bạn với bất kỳ ai khác.',
                state : null
            });
            setLogCheckConfirmPassWord({
                title : 'Nhập lại mật khẩu',
                state : null
            });
            setLogCheckPassWord({
                title : 'Nhập mật khẩu của bạn...',
                level: null,
                state:null
            })
            setLogCheckFirstName({...logCheckFirstName,title:'Họ và tên đệm của bạn',state:null});
            setLogCheckLastName({...logCheckLastName,title:'Tên của bạn',state:null});
            setShowStrengthMeter(false);
            setLoading(true);
        }
        
    };

    const createUserFireBase = async(uid,email, password,displayName) => {
        const auth = getAuth();
        try{
            await createUserWithEmailAndPassword(auth, email, password);  
            //create user on fire store
            await setDoc(doc(db, "users", uid), {
                uid: uid,
                displayName,
                email
            });
  
              //create empty user chats on fire store
            await setDoc(doc(db, "userChats", uid), {});
        }catch(error){

        }
    }

    useEffect(() => {
        if(state.msg === 'success' && state.uid !== ''){
            const fullName = valueFirstNameUser + " " +valueLastNameUser;
            createUserFireBase(state.uid,valueEmailUser,valuePasswordUser,fullName);
            const timer = setTimeout(() => {
                setLoading(state.isLoading); 
                const updateOb = {...logCheckConfirmPassWord , title : 'Tạo tài khoản thành công' , state:true}
                setLogCheckConfirmPassWord(updateOb);
            },3000);
            return () => clearTimeout(timer);
        }
    },[state.msg,state.isLoading,state.uid])

    return ( 
        <AuthForm title={'Đăng ký'} des={'Bạn có sẵn tài khoản?'} toWith={'Đăng nhập ngay'}>
            <div className={cx('container__content','px-10 py-5')}>
                <form method="POST">
                    <div className={cx('container__content-ipFullName','flex items-center')}>
                        <div className={cx('w-2/4')}>
                            <InputTemplate
                                typeIP="auth"
                                titleAuth={logCheckFirstName}
                                type="text"
                                placeholder="Nhập Họ"
                                className="pr-3"
                                classNameInput={cx('container__content-ipFullName-Surname')}
                                onChangeValue={handleChangeFirstName}
                            />
                        </div>
                        <div className={cx('w-2/4')}>
                            <InputTemplate
                                typeIP="auth"
                                titleAuth={logCheckLastName}
                                type="text"
                                placeholder="Nhập Tên"
                                className="pl-3"
                                classNameInput={cx('container__content-ipFullName-Surname')}
                                onChangeValue={handleChangeLastName}
                            />
                        </div>
                    </div>
                    <div className={cx('container__content-ipEmail')}>
                        <InputTemplate
                            typeIP="auth"
                            titleAuth={logCheckEmail}
                            type="email"
                            placeholder="Nhập Email"
                            onChangeValue={handleChangeValueEmail}
                        />
                        <span className={cx('container__content-log')}></span>
                    </div>
                    <div className={cx('container__content-ipPassword')}>
                        <InputTemplate
                            typeIP="auth"
                            titleAuth={
                                {
                                    state : logCheckPassWord.state
                                }
                            }
                            nameIp="password"
                            autoComplete='new-password'
                            type="password"
                            placeholder="Nhập Password"
                            onChangeValue={handleChangePassword}
                        />
                        {
                            isShowStrengthMeter ? (
                                <div className={cx('container__content-strengthMeter')}>
                                    <div className={cx('container__content-strengthLevel',checkSafetyPassWord ? checkSafetyPassWord : '')}></div>
                                </div>
                            ): ''
                        }
                        <div className={cx('flex items-center justify-between',isShowStrengthMeter ? 'py-5' : '')}>
                            <span 
                                className={cx('container__content-log',
                                    logCheckPassWord.level === 'low' ? 'container__content-low' : '',
                                    logCheckPassWord.level === 'medium' ? 'container__content-medium' : '',
                                    logCheckPassWord.level === 'high' ? 'container__content-high' : '')}
                            >
                                    {logCheckPassWord.title}
                            </span>
                            <Tippy
                            content='Bao gồm ít nhất một chữ hoa, một chữ thường, một ký tự đặc biệt, một số và dài 8 ký tự.'
                            > 
                                <FontAwesomeIcon className={cx('text-primaryColor')} icon={faCircleInfo}/>
                            </Tippy>
                        </div>
                    </div>
                    <div className={cx('container__content-ipPassword')}>
                        <InputTemplate
                            typeIP="auth"
                            titleAuth={logCheckConfirmPassWord}
                            type="password"
                            placeholder="Nhập lại Password"
                            onChangeValue={handleConfirmPassword}
                            nameIp="new-password"
                            autoComplete='new-password'
                        />
                    </div>
                    <button 
                        className={cx('container__content-btn','flex items-center justify-center')} 
                        type="submit"
                        onClick={handleClickAddUser}
                    >   
                        {
                            isLoading ? (
                                <div className={cx('cssload-loader','mr-10')}>
                                    <div className={cx('cssload-inner','cssload-one')}></div>
                                    <div className={cx('cssload-inner','cssload-two')}></div>
                                    <div className={cx('cssload-inner','cssload-three')}></div>
                                </div>
                                
                            ) : ''
                        }
                        {isLoading ? 'Đang tải...' : 'Đăng ký'}
                    </button>
                </form>    
                {isLoading ? (<div className={cx('container__process')}></div>) : ''}
            </div>   
        </AuthForm>
    );
}

export default Register;