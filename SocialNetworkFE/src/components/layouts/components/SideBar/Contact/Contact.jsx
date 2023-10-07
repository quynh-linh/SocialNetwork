import classNames from "classnames/bind";
import styles from "./Contact.module.scss";
import AddFriends from "~/components/form/AddFriends/AddFriends";
function SidebarContact() {
    const cx = classNames.bind(styles);
    const DATA_FRIENDS = [
        {
            id: 'AQLICWM12312KD',
            name: 'Quan Văn Mạnh',
            mutual : 77
        },
        {
            id: 'AQLICWM12312KDQQQQDASDSDACCAS',
            name: 'Nguyễn Ngọc Đính',
            mutual : 77,
            accept: 'True'
        }
    ];
    return ( 
        <div className={cx('wrapper','bg-sidebar shadow-bsd-bottom')}>
            <div>
                <h2 className={cx("wrapper__titleFollow")}>Who to follow</h2>
                {
                    DATA_FRIENDS.map((item,index) => {
                        return <AddFriends key={index} data={item}/>
                    })
                }
                
            </div>
        </div>
    );
}

export default SidebarContact;