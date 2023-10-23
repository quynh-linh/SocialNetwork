import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    user:{
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        dateOfBirth: ''
    },
    token : '',
    isAuthenticated: false,
    isLoading: false,
    msg:'',
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
const getInfoUserByToken = createAsyncThunk('getInfoUserByToken',async(slug)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/users/token/'+slug, {
            method: 'POST',
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
const updateUserDB = createAsyncThunk('updateUserDB',async(body)=> {
    try {
        const res = await fetch(URL_API + 'api/v1/users/update', {
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
        updateUSer : (state,action) => {
            const {firstName,lastName,email,address,dateOfBirth} = action.payload;
            state.user.firstName = firstName;
            state.user.lastName = lastName;
            state.user.email = email;
            state.user.address = address;
            state.user.dateOfBirth = dateOfBirth;
        }
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
        });
        builder.addCase(signUpUser.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= SIGN UP =================
        builder.addCase(signInUser.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(signInUser.fulfilled,(state,action) => {
            const { token , message , userID} = action.payload;
            state.isLoading = false;
            state.token = token;
            state.msg = message;
            state.user.userId = userID;
            // SAVE TOKEN USER IN LOCALSTRORAGE
            localStorage.setItem('token', token);
        });
        builder.addCase(signInUser.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= GET INFO USER BY TOKEN =================
        builder.addCase(getInfoUserByToken.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getInfoUserByToken.fulfilled,(state,action) => {
            state.isLoading = false;
            const {id,firstName,lastName,email,address,dateOfBirth} = action.payload;
            // 
            state.user.id = id;
            state.user.firstName = firstName;
            state.user.lastName = lastName;
            state.user.email = email;
            state.user.address = address;
            state.user.dateOfBirth = dateOfBirth;
        });
        builder.addCase(getInfoUserByToken.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= UPDATE USER =================
        builder.addCase(updateUserDB.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(updateUserDB.fulfilled,(state,action) => {
            state.isLoading = false;
            const {message} = action.payload;
            state.msg = message;
        });
        builder.addCase(updateUserDB.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default authSlice.reducer;
export {getListUsers,signUpUser,signInUser,getInfoUserByToken,updateUserDB};
export const {updateUSer} = authSlice.actions; 