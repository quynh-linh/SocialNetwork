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
        'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/352771976_1767135150409702_6276671835276624372_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=du_xj04b8iIAX_UiPKW&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfCJoA76cjQgx8vw5YxNnY8Lq0L8Z86Cq_bgb1ORfGELmQ&oe=652D8C2B',
        'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/355112958_1766574740465743_8520090091502057790_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Pf1cCq8W3QsAX_n79rn&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfB8uNQCeRysZQMKeEki9Z9SvsIBVLgDJPH3x8EJ5OlMvA&oe=652F1DBB',
        'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/327898676_1027671731956043_2947151331630452073_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=VgYZHpuvC_oAX-N5SbW&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfBsT3v8Ty6j7Hg82ySmbVS_iV-GShwUMaWESkcqiiR6XQ&oe=652F10DF',
        'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-6/327011236_980982532874472_1754238848794291446_n.jpg?stp=cp6_dst-jpg&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=9pH6YwlveucAX-H_pEW&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfDmBr5T7_URx_oS94jrhZKdOLTcict1E5Mrkq74AcdjJw&oe=652D7B75',
        'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/228284268_1297187464071142_4220825061844970283_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=_AJMZd-vT2EAX_edOn0&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfDxU176evnqiIues8hKFBh44s9VpKbFJG_FfT2fjKmLSw&oe=652D9F65',
        'https://scontent.fsgn2-3.fna.fbcdn.net/v/t39.30808-6/229994949_1293159267807295_5495284847977983067_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=QMapiaII2UAAX-F3KPG&_nc_ht=scontent.fsgn2-3.fna&oh=00_AfB4mv5vj__pkSyKvpGSXL-PVYX5hEmSTCJvVWCdkXJqog&oe=652E0C99',
        'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-6/214835236_1279752475814641_30914113060604844_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=5f2048&_nc_ohc=z2utL3vPX5YAX89txS9&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfBjvvBGa8pXzYdV81wsIV6CawFNTvoblWKgp5wr-HzlAg&oe=652DA39F',
        'https://scontent.fsgn2-5.fna.fbcdn.net/v/t1.6435-9/191059187_1248722125584343_3739672310372904470_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=7f8c78&_nc_ohc=U3PMbSDZPRYAX8bMqOr&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfB6WJ-cNRy3bkqej6lG1KQrqYCfIodbqURIkzN9-BkDPQ&oe=6550B75F',
        'https://scontent.fsgn2-7.fna.fbcdn.net/v/t1.6435-9/186108641_1239381203185102_5435683463743566555_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=dd63ad&_nc_ohc=LayoZEycM_EAX9JSxjN&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDpbSjgI49oRCvBwtMLz6t9zpiu5de-zJeX_6_oaVlmtg&oe=65509F9A',
    ]
}
const ALL_FRIENDS_USER = [
    {
        id: '',
        name: 'Quan Văn Mạnh',
        image: 'https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-1/361848543_1651168908703220_1686531172149351760_n.jpg?stp=dst-jpg_s200x200&_nc_cat=106&ccb=1-7&_nc_sid=5f2048&_nc_ohc=MnZpzrR7DdoAX8ROiOm&_nc_ht=scontent.fsgn2-5.fna&oh=00_AfDRkQRnDGc3tnsklyuKyDxLClbQzpcaZqbNM2eDz1OyXA&oe=652D5F03'
    },
    {
        id: '',
        name: 'Kim Yến',
        image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t39.30808-1/386779619_2182540565421837_3716079065398434314_n.jpg?stp=dst-jpg_p200x200&_nc_cat=102&ccb=1-7&_nc_sid=5f2048&_nc_ohc=erjTpl02AvsAX9x6VEu&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfC5uZUXGJPr3qld4rfxXR4UFyUX61FQi_-sZ7Jid-Xj_w&oe=652DB368'
    },
    {
        id: '',
        name: 'Nguyễn Tuấn',
        image: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/382362565_1775548136236724_7122833906911335043_n.jpg?stp=dst-jpg_p200x200&_nc_cat=103&ccb=1-7&_nc_sid=5f2048&_nc_ohc=LNrgJ5tdLCUAX_0eK4F&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfCbbKPuRDJ_6HXX_Pmzu7Bm_olOhqIWrYY7LlQChFXtuw&oe=652EDC51'
    },
    {
        id: '',
        name: 'Nguyễn Đức',
        image: 'https://scontent.fsgn2-7.fna.fbcdn.net/v/t39.30808-1/368347455_241727318838340_819731402914614650_n.jpg?stp=dst-jpg_p200x200&_nc_cat=108&ccb=1-7&_nc_sid=5f2048&_nc_ohc=rfWqqnkNEegAX9Biqs4&_nc_ht=scontent.fsgn2-7.fna&oh=00_AfDUIvPGE4oHAJarxrhbLCfSdJ5DCXiLjG3jltnDqV_Hww&oe=652F0E4F'
    },
    {
        id: '',
        name: 'Nguyễn Phương Kiều My',
        image: 'https://scontent.fsgn2-9.fna.fbcdn.net/v/t39.30808-1/366368345_3401351663437283_4038136604209850389_n.jpg?stp=dst-jpg_p200x200&_nc_cat=105&ccb=1-7&_nc_sid=5f2048&_nc_ohc=HGfH2R2KYh8AX_k0aBx&_nc_ht=scontent.fsgn2-9.fna&oh=00_AfCS-bz7ir68XkA1JFG9Okb_QUPnCM3EbUK1trSL7KEaRg&oe=652EAD7C'
    },
    {
        id: '',
        name: 'Nguyễn Ngọc Đính',
        image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=PXdsVcksYukAX8L3rkf&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfCLS88vp5K6sJ580m3HXSko1NccjIClFEL1V0bg5UreUA&oe=6550AF38'
    },
    {
        id: '',
        name: 'Nguyễn Ngọc Hữu',
        image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=PXdsVcksYukAX8L3rkf&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfCLS88vp5K6sJ580m3HXSko1NccjIClFEL1V0bg5UreUA&oe=6550AF38'
    },
    {
        id: '',
        name: 'Gia Linh',
        image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=PXdsVcksYukAX8L3rkf&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfCLS88vp5K6sJ580m3HXSko1NccjIClFEL1V0bg5UreUA&oe=6550AF38'
    },
    {
        id: '',
        name: 'Đinh Phong',
        image: 'https://scontent.fsgn2-8.fna.fbcdn.net/v/t1.30497-1/143086968_2856368904622192_1959732218791162458_n.png?_nc_cat=1&ccb=1-7&_nc_sid=2b6aad&_nc_ohc=PXdsVcksYukAX8L3rkf&_nc_ht=scontent.fsgn2-8.fna&oh=00_AfCLS88vp5K6sJ580m3HXSko1NccjIClFEL1V0bg5UreUA&oe=6550AF38'
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