import {getPosts} from "../utils/api.ts";
import {IPost } from "../utils/types.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    posts: IPost[],
    loading: boolean,
    error: null | string,
}
const initialState: IInitialState = {
    posts: [],
    loading: false,
    error: null,
}

export const getPostsApiThunk = createAsyncThunk(
    'posts/getPosts',
    getPosts
);
export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{},
    selectors: {
        selectIsPostsLoading: (sliceState)=> sliceState.loading,
        selectPosts: (sliceState)=> sliceState.posts
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostsApiThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(getPostsApiThunk.rejected, (state) => {
                state.loading = false;
                state.error = 'Oшибка загрузки постов';
            })
            .addCase(getPostsApiThunk.fulfilled, (state, action ) => {
                state.loading = false;
                state.posts = action.payload;
            });
    }
})

export default postsSlice.reducer;
export const { selectIsPostsLoading, selectPosts } = postsSlice.selectors