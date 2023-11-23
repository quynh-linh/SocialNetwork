import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
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

const friendSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
    },
    extraReducers : (builder) => {
        // ================= ADD FRIENDS =================
        builder.addCase(addPosts.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(addPosts.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(addPosts.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
export default friendSlice.reducer;
export {
    // ADD POST
    addPosts,
    // ADD POST MEDIA
    addPostMedia,
    // GET LIST POST
    getListPost
};