import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
}

// HANDLE REGISTER USER
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

const friendSlice = createSlice({
    name: "friends",
    initialState,
    reducers: {
        updateFriend: (state,action) =>{

        }
    },
    extraReducers : (builder) => {
        // ================= SIGN UP =================
        builder.addCase(addFriends.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(addFriends.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(addFriends.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default friendSlice.reducer;
export {
    // ADD FRIENDS
    addFriends,
};
export const {updateFriend} = friendSlice.actions; 