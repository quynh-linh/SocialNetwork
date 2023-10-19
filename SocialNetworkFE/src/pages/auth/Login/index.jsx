import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import AuthForm from "~/components/form/auth/authForm";
import { useDispatch } from "react-redux";
import { signInUser, signUpUser } from "~/redux/authSlice";
import { useState } from "react";
import { InputTemplate } from "~/components/input";
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
    const handleLoginUser = (event) => {
        event.preventDefault();
        dispatch(signInUser({
            email : valueEmailInput,
            password: valuePasswordInput
        }));
    };

    const handleChangeEmail = (e) =>{
        setValueEmailInput(e.target.value)
    };
    const handleChangePassword = (e) =>{
        setValuePasswordInput(e.target.value)
    };
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
                        <div>
                            <input type="checkbox" className={cx('')}/>
                            <span className={cx('pl-5')}>Quên mật khẩu?</span>
                        </div>
                        <span className={cx('text-primaryColor font-semibold')}>Quên mật khẩu?</span>
                    </div>
                    <button 
                        className={cx('container__content-btn')} 
                        type="submit"
                        onClick={handleLoginUser}
                    >
                        Đăng nhập
                    </button>
                </form>        
            </div>
        </AuthForm>
    );
}
export default Login;