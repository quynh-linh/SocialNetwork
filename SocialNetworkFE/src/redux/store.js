import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import friendsSlice from "./friendSlice";
const store = configureStore({
    reducer : {
        auth : authSlice,
        friends: friendsSlice
    }
})
export default store;