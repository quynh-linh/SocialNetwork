import { faHeartbeat, faHouse, faLocation, faLocationDot, faSchool } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";

const DATA_PAGES = [
    {
        id: 0,
        name: 'Feed',
        icon: images.hours
    },
    {
        id: 1,
        name: 'Connections',
        icon: images.programmer
    },
    {
        id: 2,
        name: 'Latest News',
        icon: images.earth
    },
    {
        id: 3,
        name: 'Groups',
        icon: images.groups
    },
];
// PAGE MENU
const DATA_MENU_PAGES = [
    {
        id: 0,
        name: 'Albums'
    },
    {
        id: 1,
        name: 'Profile'
    },
    {
        id: 2,
        name: 'Group'
    },
    {
        id: 3,
        name: 'Group Detail'
    },
    {
        id: 4,
        name: 'Messaging'
    }
];
const DATA_MENU_CHILDREN_PROFILE = [
    {
        path: '/profile',
        name: 'Bài viết'
    },
    {
        path: '/profile/about',
        name: 'Giới thiệu'
    },
    {
        path: '/profile/friends',
        name: 'Bạn bè'
    },
    {
        path: '/profile/photos',
        name: 'Ảnh'
    },
    {
        path: '/profile/videos',
        name: 'Video'
    }
];
const DATA__PERSONAL__INFORMATION = {
    university : {
        id: 'universitySG',
        name: 'Đại học Sài Gòn',
        icon: faSchool,
        status:'Đang học'
    },
    hightSchool:{
        id: 'hightSchoolSG',
        name: 'Hoàng Hoa Thám',
        icon: faSchool,
        status:'Đã từng'
    },
    from: {
        name: 'Thành Phố Hồ Chí Minh',
        icon: faLocationDot
    },
    liveAt: {
        name: 'Thành phố Pleiku',
        icon: faHouse
    },
    matrimony:{
        id:'',
        name:'Hẹn hò'
    },
    view : 789
};
const ALL_IMAGES_USER = {
    id: '',
    name: 'Quynh Linh',
    images : [
        ''
    ]
}
const ALL_FRIENDS_USER = [
    {
        id: '',
        name: 'Quan Văn Mạnh',
        image: ''
    },
    {
        id: '',
        name: 'Kim Yến',
        image: ''
    },
    {
        id: '',
        name: 'Nguyễn Tuấn',
        image: ''
    },
    {
        id: '',
        name: 'Nguyễn Đức',
        image: ''
    },
    {
        id: '',
        name: 'Nguyễn Phương Kiều My',
        image: ''
    },
    {
        id: '',
        name: 'Nguyễn Ngọc Đính',
        image: ''
    },
    {
        id: '',
        name: 'Nguyễn Ngọc Hữu',
        image: ''
    },
    {
        id: '',
        name: 'Gia Linh',
        image: ''
    },
    {
        id: '',
        name: 'Đinh Phong',
        image: ''
    }
]
const DATA_SETTINGS_MENU_CONTROL = [
    {
        id: 'account',
        name: 'Account',
        image: 'https://social.webestica.com/assets/images/icon/person-outline-filled.svg',
        path:'/settings',
        status: true
    },
    {
        id: 'notify',
        name: 'Notification',
        image: 'https://social.webestica.com/assets/images/icon/notification-outlined-filled.svg',
        path:'/settings/notify',
        status: false
    },
    {
        id: 'security',
        name: 'Privacy and safety',
        image: 'https://social.webestica.com/assets/images/icon/shield-outline-filled.svg',
        path:'/settings/security',
        status: false
    },
    {
        id: 'community',
        name: 'Communications',
        image: 'https://social.webestica.com/assets/images/icon/handshake-outline-filled.svg',
        path:'/settings/community',
        status: false
    },
    {
        id: 'message',
        name: 'Messaging ',
        image: 'https://social.webestica.com/assets/images/icon/chat-alt-outline-filled.svg',
        path:'/settings/message',
        status: false
    },
];
export {
    DATA_PAGES,DATA_MENU_PAGES,
    DATA_MENU_CHILDREN_PROFILE,
    DATA__PERSONAL__INFORMATION,
    ALL_IMAGES_USER,
    ALL_FRIENDS_USER,
    DATA_SETTINGS_MENU_CONTROL
};