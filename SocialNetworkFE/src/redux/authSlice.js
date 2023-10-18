import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    msg : '',
    email: '',
    password: '',
    token : '',
    isAuthenticated: false,
    isLoading: false,
    error: '',
}
const signInUser = createAsyncThunk('signInUser',async()=> {
    try {
        const response = await fetch(URL_API+'api/v1/users');
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return data;
        } else {
            console.error('Error fetching data:', response.status);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logOut : (state,action) => {
            console.log(action.payload);
            const {email , password , token} = action.payload;
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            localStorage.removeItem('token');
            localStorage.removeItem('tokenExpiration');
            state.email = email;
            state.password = password;
            state.token = token;
        },
    },
    extraReducers : (builder) => {
        // ================= LOGIN =================
        builder.addCase(signInUser.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(signInUser.fulfilled,(state,action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            console.log(action.payload);
        });
        builder.addCase(signInUser.rejected,(state,action) => {
            state.isLoading = true;
            state.error = action.payload.error;
        });
    }
});
  
export default authSlice.reducer;
export {signInUser};
export const {logOut} = authSlice.actions; 