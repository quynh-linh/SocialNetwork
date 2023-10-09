import classNames from "classnames/bind";
import styles from "./Login.module.scss";
import AuthForm from "~/components/form/auth/authForm";
function Login() {
    const cx = classNames.bind(styles);
    return (  
        <AuthForm title={'Sign in'} des={'Don\'t have an account?'} toWith={'Click here to sign up'}>
            <div className={cx('container__content','px-20 py-10')}>
                <form method="POST">
                    <div className={cx('container__content-ipEmail')}>
                        <input className={cx('w-full')} type="email" placeholder="Enter Email"/>
                    </div>
                    <div className={cx('container__content-ipPassword')}>
                        <input className={cx('w-full')} type="password" placeholder="Enter Password"/>
                    </div>
                    <div className={cx('flex items-center justify-between','')}>
                        <div>
                            <input type="checkbox" className={cx('')}/>
                            <span className={cx('pl-5')}>Remember me?</span>
                        </div>
                        <span className={cx('text-primaryColor font-semibold')}>Forgot password?</span>
                    </div>
                    <button className={cx('container__content-btn')} type="submit">Login</button>
                </form>        
            </div>
        </AuthForm>
    );
}
export default Login;