import classNames from "classnames/bind";
import styles from "./input.module.scss";
function InputTemplate({
    typeIP='',
    titleAuth=undefined,
    title='',
    type='',
    placeholder='',
    className='',
    classNameInput='',
    onChangeValue=undefined,
    nameIp='',
    autoComplete='',
    pattern='',
    valueIP=''}) {
    const cx = classNames.bind(styles);
    return (  
        <div className={cx('w-full',className)}>
            {
                typeIP === 'auth' ? (
                    <div>
                        <input
                            type={type}
                            placeholder={placeholder}
                            className={cx('btn',classNameInput, titleAuth ? (titleAuth.state !== null ? (!titleAuth.state ? 'error' : '') : '') : '')}
                            onChange={onChangeValue}
                            name={nameIp}
                            autoComplete={autoComplete}
                        />
                        {
                            titleAuth ? (
                                <div className={cx('title-auth',titleAuth.state !== null ? (titleAuth.state ? 'success' : 'error') : '')}>
                                    {titleAuth.title ? titleAuth.title : ''}
                                </div>
                            ) : ''
                        }
                    </div>
                ) : ''
            }
            {
                typeIP === 'edit' ? (
                    <div>
                        {
                            title ? (
                                <div className={cx('title')}>{title}</div>
                            ) : ''
                        } 
                        <input
                            type={type}
                            placeholder={placeholder ? placeholder : ''}
                            className={cx('btn',classNameInput)}
                            name={nameIp ? nameIp : ''}
                            value={valueIP ? valueIP : ''}
                            onChange={onChangeValue}
                        />
                    </div>
                ) : ''
            }
        </div>
    );
}

export {InputTemplate};