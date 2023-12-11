import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
    listMediaByUser: []
}
// HANDLE ADD MEDIA TO DB
const getListMedia = createAsyncThunk('getListMedia',async(body)=> {
    try {
        const {id,limit} = body;
        const res = await fetch(URL_API + `api/v1/media?id=${id}&&limit=${limit}`, {
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
// HANDLE ADD MEDIA TO DB
const getListMediaByPost = createAsyncThunk('getListMediaByPost',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/v1/media/getListMediaByPost/${id}`, {
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
// HANDLE ADD MEDIA TO DB
const addMedia = createAsyncThunk('addMedia',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/media/add', {
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

const mediaSlice = createSlice({
    name: "media",
    initialState,
    reducers: {
    },
    extraReducers : (builder) => {
        // ================= ADD FRIENDS =================
        builder.addCase(addMedia.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(addMedia.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(addMedia.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= GET LIST MEDIA USER =================
        builder.addCase(getListMedia.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getListMedia.fulfilled,(state,action) => {
            state.isLoading = false;
            state.listMediaByUser = action.payload || null;
        });
        builder.addCase(getListMedia.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
export default mediaSlice.reducer;
export {
    // ADD FRIENDS
    addMedia,
    // GET LIST MEDIA
    getListMedia,
    // GET LIST MEDIA BY POST
    getListMediaByPost
};