import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
}

// HANDLE ADD FRIENDS
const addFriends = createAsyncThunk('addFriends',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/frindship/add', {
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

// HANDLE CHECK STATUS FRIENDS
const checkStatusFriends = createAsyncThunk('checkStatusFriends',async(body)=> {
    try {
        const {current,other} = body;
        const res = await fetch(URL_API + `api/v1/frindship/check?current=${current}&&other=${other}`, {
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

const friendSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
    },
    extraReducers : (builder) => {
        // ================= ADD FRIENDS =================
        builder.addCase(addFriends.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(addFriends.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(addFriends.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= CHECK STATUS FRIENDS =================
        builder.addCase(checkStatusFriends.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(checkStatusFriends.fulfilled,(state,action) => {
            state.isLoading = false;
            state.msg = action.payload.friendshipStatus || '';
        });
        builder.addCase(checkStatusFriends.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default friendSlice.reducer;
export {
    // ADD FRIENDS
    addFriends,
    // CHECK STATUS FRIENDS
    checkStatusFriends
};
//export const {} = friendSlice.actions; 