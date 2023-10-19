import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    user:{},
    token : '',
    isAuthenticated: false,
    isLoading: false,
    msg:''
}
const getListUsers = createAsyncThunk('getListUsers',async()=> {
    try {
        const response = await fetch(URL_API+'api/v1/users');
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Error fetching data:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
const signUpUser = createAsyncThunk('signUpUser',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/users/add', {
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
const signInUser = createAsyncThunk('signInUser',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/users/login', {
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
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut : (state,action) => {

        },
    },
    extraReducers : (builder) => {
        // ================= SIGN UP =================
        builder.addCase(signUpUser.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(signUpUser.fulfilled,(state,action) => {
            const {message} = action.payload;
            state.isLoading = false;
            state.msg = message;
            console.log(message);
        });
        builder.addCase(signUpUser.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= SIGN UP =================
        builder.addCase(signInUser.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(signInUser.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(signInUser.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
  
export default authSlice.reducer;
export {getListUsers,signUpUser,signInUser};
export const {logOut} = authSlice.actions; 