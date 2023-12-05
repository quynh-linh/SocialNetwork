import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
}
// HANDLE GET LIST COMMENT BY POST
const getListCommentByPost = createAsyncThunk('getListCommentByPost',async(body)=> {
    try {
        const {id,limit} = body;
        const res = await fetch(URL_API + `api/v1/comments/getListCommentByPost?postId=${id}&&limit=${limit}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});
// HANDLE GET LIST PARENT COMMENT BY ID
const getListParentCommentById = createAsyncThunk('getListParentCommentById',async(body)=> {
    try {
        const {id,limit,commentId} = body;
        const res = await fetch(URL_API + `api/v1/comments/getListParentCommentById?postId=${id}&&limit=${limit}&&commentId=${commentId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});
// HANDLE ADD COMMENTS
const addComments = createAsyncThunk('addComments',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/comments/add', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
});
// HANDLE GET TOTAL COMMENT BY POST
const getTotalCommentByPost = createAsyncThunk('getTotalCommentByPost',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/v1/comments/getCountCommentParentByPost?postId=${id}`, {
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
const commentSlice = createSlice({
    name: "comment",
    initialState,
    reducers: {
    },
    extraReducers : (builder) => {
        // ================= ADD FRIENDS =================
        builder.addCase(getListCommentByPost.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getListCommentByPost.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(getListCommentByPost.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
export default commentSlice.reducer;
export {
    // GET COMMENT BY POST (FIRST COMMENT)
    getListCommentByPost,
    // GET PARENT COMMENT (FIRST PARENT)
    getListParentCommentById,
    // ADD COMMENTS
    addComments,
    // GET TOTAL COMMENT BY POST
    getTotalCommentByPost
};