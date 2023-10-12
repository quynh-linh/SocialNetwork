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
const DATA__PERSONAL__INFORMATION = [
    {
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
            name: 'Thành Phố Pleiku',
            icon: faLocationDot
        },
        liveAt: {
            name: 'Thành Phố Hồ Chí Minh',
            icon: faHouse
        },
        matrimony:{
            id:'',
            name:'Hẹn hò',
            status:'',
        },
        view : 789
    }
];
export {
    DATA_PAGES,DATA_MENU_PAGES,
    DATA_MENU_CHILDREN_PROFILE,
    DATA__PERSONAL__INFORMATION
};