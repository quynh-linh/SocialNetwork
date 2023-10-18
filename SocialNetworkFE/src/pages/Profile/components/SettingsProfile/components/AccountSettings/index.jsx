import classNames from "classnames/bind";
import styles from './AccountSettings.module.scss';
import { InputTemplate } from "~/components/input";
import { Button } from "~/components/button/button";
function AccountSettings() {
    const cx = classNames.bind(styles);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('wrapper__header')}>
                <h1>Cài đặt tài khoản</h1>
                <span className={cx('text-color-text')}>
                    Ánh trăng khó khăn, mải mê nó, các vận động viên. Quan tâm có tất cả Devonshire khó khăn hỗ trợ đồng tính niềm vui. Không bị ảnh hưởng bởi các ngươi thay đổi lời khen.
                </span>
            </div>
            {/* FORM EDIT INFO USER */}
            <form action="" method="post">
                <div className="flex items-center mt-5">
                    {/* INPUT FULLNAME */}
                    <InputTemplate
                        title="Họ"
                        type="Text"
                        placeholder="Nguyễn Thanh Quỳnh"
                        className="mr-4"
                    />
                    <InputTemplate
                        title="Tên"
                        type="Text"
                        placeholder="Linh"
                        className="mr-4"
                    />
                    {/* INPUT NICKNAME */}
                    <InputTemplate
                        title="Nickname"
                        type="Text"
                        placeholder="John Wick"
                    />
                </div>
                <div className="flex items-center mt-11">
                    {/* INPUT NAME USER */}
                    <InputTemplate
                        title="Tên người dùng"
                        type="text"
                        placeholder="quynhlinh2106"
                        className="mr-4"
                    />
                    {/* INPUT BIRTHDAY */}
                    <InputTemplate
                        title="Sinh nhật"
                        type="date"
                        placeholder="21/06/2002"
                    />
                </div>
                <div className="flex items-center mt-11">
                    {/* INPUT EMAIL */}
                    <InputTemplate
                        title="Email"
                        type="email"
                        placeholder="nguyenthanhquynhlinh@gmail.com"
                        className="mr-4"
                    />
                    {/* INPUT BIRTHDAY */}
                    <InputTemplate
                        title="Số điện thoại"
                        type="text"
                        placeholder="098 198 4623"
                    />
                </div>
                <div className={cx('text-end mt-11')}>
                    <Button content="Lưu thay đổi" type="submit" className="btn-saveAccount"/>
                </div>
            </form>
        </div>
    );
}

export default AccountSettings;