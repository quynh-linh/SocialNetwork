import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import friendsSlice from "./friendSlice";
import commentSlice from "./commentSlice";
import postSlice from "./postSlice";
const store = configureStore({
    reducer : {
        auth : authSlice,
        friends: friendsSlice,
        comment: commentSlice,
        post: postSlice,
    }
})
export default store;