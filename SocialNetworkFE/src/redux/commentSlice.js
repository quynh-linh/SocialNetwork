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
// HANDLE ADD MEDIA TO DB
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
    getListParentCommentById
};