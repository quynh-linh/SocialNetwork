import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import AboutProfile from "~/pages/Profile/components/About/About";
import HomeProfile from "~/pages/Profile/components/HomeProfile/HomeProfile";
import NotificationSettings from "~/pages/Profile/components/SettingsProfile/components/NotificationSettings";
import SettingsProfile from "~/pages/Profile/components/SettingsProfile";
import AccountSettings from "~/pages/Profile/components/SettingsProfile/components/AccountSettings";
import Login from "~/pages/auth/Login";
import Register from "~/pages/auth/Register";
import Connections from "~/pages/Connections";
import FriendRequest from "~/pages/Connections/components/FriendRequest/FriendRequest";
import FriendsProfile from "~/pages/Profile/components/Friends/Friends";
import ImagesProfile from "~/pages/Profile/components/Images";
const publicRoutes =[
    {   
        path: '/login', 
        component: Login,
        name: 'Đăng nhập',
        layout : 'Auth Layout'
    },
    {   
        path: '/register', 
        component: Register,
        name: 'Đăng ký',
        layout : 'Auth Layout'
    }
    
]
const privateRoutes = [
    {   
        path: '/profile/*', 
        component: Profile,
        name: 'Chi tiết trang cá nhân',
        layout : 'Profile Layout',
        routes: [
            {
                path: '',
                component: HomeProfile,
                name: 'Bài viết'
            },
            {
                path: 'about',
                component: AboutProfile,
                name: 'Giới thiệu'
            },
            {
                path: 'friends',
                component: FriendsProfile,
                name: 'Bạn bè'
            },
            {
                path: 'photos',
                component: ImagesProfile,
                name: 'Ảnh'
            },
            {
                path: 'videos',
                component: AboutProfile,
                name: 'Video'
            }
        ]
    },
    {   
        path: '/settings/*', 
        component: SettingsProfile,
        name: 'Cài đặt',
        layout : 'Settings Layout',
        routes: [
            {
                path: '',
                component: AccountSettings,
                name: 'Account Settings'
            },
            {
                path: 'notify',
                component: NotificationSettings,
                name: 'Notification Settings'
            }
        ]
    },
    {   
        path: '/friends/*', 
        name: 'Kết nối',
        layout : 'Connections Layout',
        routes: [
            {
                path: '',
                component: Connections,
                name: 'Friends'
            },
            {
                path: 'requests',
                component: FriendRequest,
                name: 'Request'
            },
            {
                path: 'suggestions',
                component: FriendRequest,
                name: 'Suggestions'
            },
            {
                path: 'list',
                component: FriendRequest,
                name: 'List'
            }
        ]
    },
    {   
        path: '/search/*', 
        name: 'Tìm kiếm',
        layout : 'Connections Layout',
        routes: [
            {
                path: '',
                component: Connections,
                name: 'Friends'
            },
            {
                path: 'requests',
                component: FriendRequest,
                name: 'Request'
            },
            {
                path: 'suggestions',
                component: FriendRequest,
                name: 'Suggestions'
            },
            {
                path: 'list',
                component: FriendRequest,
                name: 'List'
            }
        ]
    },
    {   
        path: '/', 
        component: Home,
        name: 'Trang chủ',
        layout : 'Default Layout'
    }
];
export {publicRoutes,privateRoutes};