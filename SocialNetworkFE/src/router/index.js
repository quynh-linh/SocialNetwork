import Home from "~/pages/Home";
import Login from "~/pages/auth/Login";
import Register from "~/pages/auth/Register";
const publicRoutes =[
    {   
        path: '/', 
        component: Home,
        name: 'Trang chủ',
        layout : 'Default Layout'
    },
    {   
        path: '/login', 
        component: Login,
        name: 'Đăng nhập',
        layout : 'Auth Layout'
    }
    ,
    {   
        path: '/register', 
        component: Register,
        name: 'Đăng ký',
        layout : 'Auth Layout'
    }
]
export {publicRoutes};