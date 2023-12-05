import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
}

// HANDLE ADD LIKE
const addLikes = createAsyncThunk('addLikes',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/likes/addLike', {
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

// HANDLE ADD FRIENDS
const getLikeByPostId = createAsyncThunk('getLikeByPostId',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/v1/likes/getCountLikeByPost?postId=${id}`, {
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

const likePostSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
    },
    extraReducers : (builder) => {
        // ================= ADD FRIENDS =================
        builder.addCase(addLikes.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(addLikes.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(addLikes.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= GET LIKES POST =================
        builder.addCase(getLikeByPostId.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getLikeByPostId.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(getLikeByPostId.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default likePostSlice.reducer;
export {
    // ADD FRIENDS
    addLikes,
    // GET LIKES BY POST ID
    getLikeByPostId
};
//export const {} = friendSlice.actions; 