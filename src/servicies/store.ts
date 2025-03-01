import {combineReducers, configureStore} from "@reduxjs/toolkit";
import postsSliceReducer from "../slices/postsSlice.ts";

export const rootReducer = combineReducers({
    posts: postsSliceReducer,
})

const store = configureStore({
    reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;