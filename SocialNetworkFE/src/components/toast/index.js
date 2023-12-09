import { toast } from "react-toastify";

export const Toast = ({type,title,position,autoClose,limit,des,content}) =>{
    if(des === 'page'){
        if(type === 'info') {
            toast.info('Trang '+ title +' đang phát triển', {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        } else if (type === 'success') {
            toast.success('Trang '+ title +' đang phát triển', {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: 1
            });
        } else if(type === 'warning'){
            toast.warning('Trang '+ title +' đang phát triển', {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        } else if(type === 'error'){
            toast.error('Trang '+ title +' đang phát triển', {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        }
    } else if (des === 'function'){
        if(type === 'info') {
            toast.info('Chức năng '+ title +' đang phát triển', {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        } else if (type === 'success') {
            toast.success('Chức năng '+ title +' đang phát triển', {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        } else if(type === 'warning'){
            toast.warning('Chức năng '+ title +' đang phát triển', {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        } else if(type === 'error'){
            toast.error('Chức năng '+ title +' đang phát triển', {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        }
    } else if (des === 'edit'){
        if(type === 'info') {
            toast.info(content, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        } else if (type === 'success') {
            toast.success(content, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        } else if(type === 'warning'){
            toast.warning(content, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        } else if(type === 'error'){
            toast.error(content, {
                position: position,
                autoClose: autoClose,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                limit: limit
            });
        }
    }
};