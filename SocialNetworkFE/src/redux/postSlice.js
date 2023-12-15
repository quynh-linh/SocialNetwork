import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
    arrSearchPost: []
}
// GET LIST POST BY USER ID
const getListPost = createAsyncThunk('getListPost',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/v1/post/getListPost/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// GET LIST POST BY USER ID
const getListPostByUserID = createAsyncThunk('getListPostByUserID',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/v1/post/getListPostByUserId/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// HANDLE ADD POST TO DB
const addPosts = createAsyncThunk('addPosts',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/post/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// HANDLE DELETE POST TO DB
const deletePost = createAsyncThunk('deletePost',async(body)=> {
    try {
        const {userId,postId} = body;
        const res = await fetch(URL_API + `api/v1/post/deletePost?postID=${postId}&&userId=${userId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// HANDLE ADD POST MEDIA TO DB
const addPostMedia = createAsyncThunk('addPostMedia',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/post_media/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body),
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

// HANDLE SEARCH POSTS
const searchByPost = createAsyncThunk('searchByPost',async(body)=> {
    try {
        const {content,limit} = body;
        const res = await fetch(URL_API + `api/v1/post/searchByPost?content=${content}&&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});

const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
    },
    extraReducers : (builder) => {
        // ================= ADD POST =================
        builder.addCase(addPosts.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(addPosts.fulfilled,(state,action) => {
            const { message } = action.payload;
            console.log(action);
            state.msg = message;
            state.isLoading = false;
        });
        builder.addCase(addPosts.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= DELETE POST =================
        builder.addCase(deletePost.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(deletePost.fulfilled,(state,action) => {
            const { message } = action.payload;
            state.msg = message;
            state.isLoading = false;
        });
        builder.addCase(deletePost.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= GET LIST POST BY USER ID =================
        builder.addCase(getListPostByUserID.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getListPostByUserID.fulfilled,(state,action) => {
            const { message } = action.payload;
            state.msg = message;
            state.isLoading = false;
        });
        builder.addCase(getListPostByUserID.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= GET LIST POST =================
        builder.addCase(getListPost.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getListPost.fulfilled,(state,action) => {
            const { message } = action.payload;
            state.msg = message;
            state.isLoading = false;
        });
        builder.addCase(getListPost.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= SEARCH POSTS =================
        builder.addCase(searchByPost.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(searchByPost.fulfilled,(state,action) => {
            state.isLoading = false;
            state.arrSearchPost = action.payload || null;
            state.msg = action.payload?.message || '';
        });
        builder.addCase(searchByPost.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
export default postSlice.reducer;
export {
    // ADD POST
    addPosts,
    // ADD POST MEDIA
    addPostMedia,
    // DELETE POST
    deletePost,
    // GET LIST POST
    getListPost,
    // GET LIST POST BY USER ID
    getListPostByUserID,
    // SEARCH POSTS
    searchByPost
};