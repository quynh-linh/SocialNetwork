import Header from "../components/Header";

function PostsLayout({children}) {
    return (  
        <div>
            <Header/>
            {children}
        </div>
    );
}

export default PostsLayout;