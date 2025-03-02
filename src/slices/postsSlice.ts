import {getPosts, IPostsParams} from "../utils/api.ts";
import {IPost } from "../utils/types.ts";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface IInitialState {
    posts: IPost[],
    loadingPosts: boolean,
    error: null | string,
    params: {
        page?: number,
        title?: string
    }


}
const initialState: IInitialState = {
    posts: [],
    loadingPosts: false,
    error: null,
    params: {
        page: 1,
        title: ''
    }
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
        selectIsPostsLoading: (sliceState)=> sliceState.loadingPosts,
        selectPosts: (sliceState)=> sliceState.posts,
        selectPage: (sliceState)=> sliceState.params.page,
        selectParams: (sliceState)=> sliceState.params,
        selectFiltering: (sliceState)=> sliceState.params.title? !!sliceState.params.title.length : false,
    },
    extraReducers: (builder) => {
        builder
            .addCase(getPostsApiThunk.pending, (state) => {
                state.loadingPosts = true;
            })
            .addCase(getPostsApiThunk.rejected, (state) => {
                state.loadingPosts = false;
                state.error = 'Oшибка загрузки постов';
            })
            .addCase(getPostsApiThunk.fulfilled, (state, action ) => {
                console.log(action)
                state.loadingPosts = false;
                state.params.title = action.meta.arg.title
                state.params.page = action.meta.arg.page
                state.posts = action.payload;
            });
    }
})

export default postsSlice.reducer;
export const { selectIsPostsLoading, selectPosts, selectPage, selectFiltering } = postsSlice.selectors