import Home from "~/pages/Home";
import Profile from "~/pages/Profile";
import AboutProfile from "~/pages/Profile/components/About/About";
import HomeProfile from "~/pages/Profile/components/HomeProfile/HomeProfile";
import NotificationSettings from "~/pages/Profile/components/SettingsProfile/components/NotificationSettings";
import SettingsProfile from "~/pages/Profile/components/SettingsProfile";
import AccountSettings from "~/pages/Profile/components/SettingsProfile/components/AccountSettings";
import Login from "~/pages/auth/Login";
import Register from "~/pages/auth/Register";
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
                component: AboutProfile,
                name: 'Bạn bè'
            },
            {
                path: 'photos',
                component: AboutProfile,
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
        path: '/', 
        component: Home,
        name: 'Trang chủ',
        layout : 'Default Layout'
    }
];
export {publicRoutes,privateRoutes};