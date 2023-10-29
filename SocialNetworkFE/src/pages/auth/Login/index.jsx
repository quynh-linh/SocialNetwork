import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import AuthForm from "~/components/form/auth/authForm";
import { useDispatch, useSelector } from "react-redux";
import { signInUser} from "~/redux/authSlice";
import { useEffect, useState } from "react";
import { InputTemplate } from "~/components/input";
import { useNavigate } from "react-router-dom";
import { Toast } from "~/components/toast";
function Login() {
    const cx = classNames.bind(styles);
    const dispatch = useDispatch();
    const [valueEmailInput,setValueEmailInput] = useState('');
    const [valuePasswordInput,setValuePasswordInput] = useState('');
    const [logCheckPassword,setLogCheckPassword] = useState({
        title : 'Nhập Password',
        state: null
    });
    const [logCheckEmail,setLogCheckEmail] = useState({
        title : 'Nhập Email',
        state: null
    });
    const [isLoading,setLoading] = useState(false);
    const state = useSelector(state => state.auth);
    const navigate = useNavigate();
    
    // HANDLE LOGIN USER
    const handleLoginUser = (event) => {
        event.preventDefault();
        if(valueEmailInput === ''){
            const updateOb = {...logCheckEmail, title: 'Bạn cần nhập email' , state: false}
            setLogCheckEmail(updateOb);
        }
        if(valuePasswordInput === ''){
            const updateOb = {...logCheckPassword, title: 'Bạn cần nhập mật khẩu' , state: false}
            setLogCheckPassword(updateOb);
        }
        if(valueEmailInput !== '' && valuePasswordInput !== ''){
            dispatch(signInUser({
                email : valueEmailInput,
                password: valuePasswordInput
            }));
            setLoading(true);
        }
    };

    // HANDLE ON CHANGE INPUT EMAIL
    const handleChangeEmail = (e) =>{
        setValueEmailInput(e.target.value)
        const updateOb = {...logCheckEmail, title: 'Nhập email' , state: null}
        setLogCheckEmail(updateOb);
    };

    //HANDLE ON CHANGE INPUT PASSWORD
    const handleChangePassword = (e) =>{
        setValuePasswordInput(e.target.value)
        const updateOb = {...logCheckPassword, title: 'Nhập mật khẩu' , state: null}
        setLogCheckPassword(updateOb);
    };


    useEffect(() => {
        const tokenUser = localStorage.getItem('token');
        if(tokenUser !== null && state.msg === 'success') {
           if(tokenUser === state.token){
                const timer = setTimeout(() => {
                    setLoading(state.isLoading);
                    navigate('/');
                },2000)
                return () => clearTimeout(timer);    
           }
        } else if (state.msg === 'error') {
            const timer = setTimeout(() => {
                Toast({type:'info',position:'bottom-left',autoClose:3000,limit:1,des:'edit',content: 'Sai email hoặc mật khẩu'});
                setLoading(false);
            },2000)
            return () => clearTimeout(timer);
        }
    },[state.token,state.isLoading,state.msg]);
    return (  
        <AuthForm title={'Đăng nhập'} des={'Bạn chưa có tài khoản?'} toWith={'Nhấn đăng ký ngay'}>
            <div className={cx('container__content','px-20 py-10')}>
                <form method="POST">
                    <div className={cx('container__content-ipEmail')}>
                        <InputTemplate
                            typeIP="auth"
                            titleAuth={logCheckEmail}
                            type="email"
                            placeholder="Nhập Email"
                            className="pr-3"
                            onChangeValue={handleChangeEmail}
                        />
                    </div>
                    <div className={cx('container__content-ipPassword')}>
                        <InputTemplate
                            typeIP="auth"
                            titleAuth={logCheckPassword}
                            type="password"
                            placeholder="Nhập mật khẩu"
                            className="pr-3"
                            onChangeValue={handleChangePassword}
                        />
                    </div>
                    <div className={cx('flex items-center justify-between mt-10 text-xl','')}>
                        <div className={cx('flex items-center')}>
                            <input type="checkbox" className={cx('')}/>
                            <span className={cx('pl-5')}>Lưu đăng nhập?</span>
                        </div>
                        <span className={cx('text-primaryColor font-semibold')}>Quên mật khẩu?</span>
                    </div>
                    <button 
                        className={cx('container__content-btn','flex items-center justify-center')} 
                        type="submit"
                        onClick={handleLoginUser}
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
                        {isLoading ? 'Đang tải...' : 'Đăng nhập'}
                    </button>
                </form>        
            </div>
        </AuthForm>
    );
}
export default Login;