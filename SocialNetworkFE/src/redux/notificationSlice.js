import { URL_API } from "~/config";
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");
const  initialState = {
    isLoading: false,
    msg:'',
    arrNotify: [],
    count: 0
}

// HANDLE GET NOTIFICATION BY USER ID
const getNotification = createAsyncThunk('getNotification',async(body)=> {
    try {
        const {userId,limit} = body;
        const res = await fetch(URL_API + `api/v1/notifications/getNotification?userId=${userId}&&limit=${limit}`, {
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

// HANDLE GET COUNT NOTIFICATION
const getCountNotificationUnread = createAsyncThunk('getCountNotificationUnread',async(body)=> {
    try {
        const {userId} = body;
        const res = await fetch(URL_API + `api/v1/notifications/getCountNotificationUnread?userId=${userId}`, {
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

// HANDLE GET COUNT NOTIFICATION
const fromNotificationToPostOrUserDetail = createAsyncThunk('fromNotificationToPostOrUserDetail',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/v1/notifications/fromNotificationToPostOrUserDetail?idNotification=${id}`, {
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

// HANDLE UPDATE STATUS NOTIFICATION
const updateStatusNotificationReaDed = createAsyncThunk('updateStatusNotificationReaDed',async(body)=> {
    try {
        const {id} = body;
        const res = await fetch(URL_API + `api/v1/notifications/updateStatusNotificationReaDed?idNotification=${id}`, {
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


const notifySlice = createSlice({
    name: "notify",
    initialState,
    reducers: {
    },
    extraReducers : (builder) => {
        // ================= GET NOTIFICATION BY USER ID =================
        builder.addCase(getNotification.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getNotification.fulfilled,(state,action) => {
            state.isLoading = false;
            state.arrNotify = action.payload || null;
        });
        builder.addCase(getNotification.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= GET COUNT NOTIFICATION =================
        builder.addCase(getCountNotificationUnread.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(getCountNotificationUnread.fulfilled,(state,action) => {
            state.isLoading = false;
            state.count = action.payload || null;
        });
        builder.addCase(getCountNotificationUnread.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= GET COUNT NOTIFICATION =================
        builder.addCase(fromNotificationToPostOrUserDetail.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(fromNotificationToPostOrUserDetail.fulfilled,(state,action) => {
            state.isLoading = false;
            console.log(action.payload);
        });
        builder.addCase(fromNotificationToPostOrUserDetail.rejected,(state,action) => {
            state.isLoading = true;
        });
        // ================= UPDATE STATUS NOTIFICATION =================
        builder.addCase(updateStatusNotificationReaDed.pending,(state,action) => {
            state.isLoading = true;
        });
        builder.addCase(updateStatusNotificationReaDed.fulfilled,(state,action) => {
            state.isLoading = false;
        });
        builder.addCase(updateStatusNotificationReaDed.rejected,(state,action) => {
            state.isLoading = true;
        });
    }
});
 
export default notifySlice.reducer;
export {
    // GET NOTIFICATION BY USER ID
    getNotification,
    // GET COUNT NOTIFICATION BY USER ID
    getCountNotificationUnread,
    fromNotificationToPostOrUserDetail,
    // UPDATE STATUS NOTIFICATION
    updateStatusNotificationReaDed
};
//export const {} = friendSlice.actions; 