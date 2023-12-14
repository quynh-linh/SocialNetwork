import { faImage, faMessage, faNewspaper } from "@fortawesome/free-regular-svg-icons";
import { faHouse, faLocationDot, faSchool, faUserGroup, faUserMinus, faUserPlus, faUserSecret, faUsers } from "@fortawesome/free-solid-svg-icons";
import images from "~/assets/images";

const DATA_PAGES = [
    {
        id: 0,
        name: 'Trang chủ',
        icon: images.hours,
        path: '/'
    },
    {
        id: 1,
        name: 'Bạn bè',
        icon: images.programmer,
        path: '/friends'
    },
    {
        id: 2,
        name: 'Tin mới nhất',
        icon: images.earth,
        path: '/'
    },
    {
        id: 3,
        name: 'Nhóm',
        icon: images.groups,
        path: '/'
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
const DATA_CONNECTIONS = [
    {
        id: 'friends',
        name: 'Trang chủ',
        image: faUsers,
        path:'/friends',
        status: true
    },
    {
        id: 'request',
        name: 'Lời mời kết bạn',
        image: faUserMinus,
        path:'/friends/requests',
        status: false
    },
    {
        id: 'suggestions',
        name: 'Gợi ý',
        image: faUserPlus,
        path:'/friends/suggestions',
        status: false
    },
    {
        id: 'list',
        name: 'Tất cả bạn bè',
        image: faUserSecret,
        path:'/friends/list',
        status: false
    }
];
const DATA_MENU_FRIENDS_PROFILE = [
    {
        id: 'friends',
        name: 'Tất cả bạn bè',
        type : 'AllFriends',
        status: true
    },
    {
        id: 'request',
        name: 'Sinh nhật',
        type : 'birthday',
        status: false
    },
    {
        id: 'suggestions',
        name: 'Đại học',
        type : 'university',
        status: false
    },
    {
        id: 'list',
        name: 'Trường trung học',
        type : 'highSchool',
        status: false
    },
    {
        id: 'list',
        name: 'Tỉnh/Thành phố hiện tại',
        type : 'CityPresent',
        status: false
    },
    {
        id: 'list',
        name: 'Quên quán',
        type: 'domicile',
        status: false
    },
    {
        id: 'list',
        name: 'Đang theo dõi',
        type: 'following',
        status: false
    }
];
const DATA_SIDEBAR_SEARCH = [
    {
        id: 'all',
        name: 'Tất cả',
        image: faNewspaper,
        path:'/search',
        status: true
    },
    {
        id: 'posts',
        name: 'Bài viết',
        image: faMessage,
        path:'/search/posts',
        status: false
    },
    {
        id: 'peoples',
        name: 'Mọi người',
        image: faUserGroup,
        path:'/search/people',
        status: false
    },
    {
        id: 'photos',
        name: 'Ảnh',
        image: faImage,
        path:'/search/photos',
        status: false
    }
];
export {
    DATA_PAGES,DATA_MENU_PAGES,
    DATA_MENU_CHILDREN_PROFILE,
    DATA__PERSONAL__INFORMATION,
    ALL_IMAGES_USER,
    ALL_FRIENDS_USER,
    DATA_SETTINGS_MENU_CONTROL,
    DATA_CONNECTIONS,
    DATA_MENU_FRIENDS_PROFILE,
    DATA_SIDEBAR_SEARCH
};