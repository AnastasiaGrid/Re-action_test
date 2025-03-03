import {getPosts} from "../utils/api.ts";
import {IPost } from "../utils/types.ts";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";

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
    }
}

export const getPostsApiThunk = createAsyncThunk(
    'posts/getPosts',
    getPosts
);

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers:{
        setTitleParam(state, action: PayloadAction<string>) {
            state.params.title = action.payload
            return state
        },
        setPageParam(state, action: PayloadAction<number>) {
            state.params.page = action.payload
            return state
        },
    },
    selectors: {
        selectIsPostsLoading: (sliceState)=> sliceState.loadingPosts,
        selectPosts: (sliceState)=> sliceState.posts,
        selectPage: (sliceState)=> sliceState.params.page,
        selectParams: (sliceState)=> sliceState.params,
        selectFiltering: (sliceState)=> sliceState.params.title? !!sliceState.params.title.length : false,
        selectError: (sliceState)=> sliceState.error,
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
                state.loadingPosts = false;
                state.posts = action.payload;
            });
    }
})

export default postsSlice.reducer;
export const { setTitleParam,setPageParam } = postsSlice.actions
export const { selectIsPostsLoading, selectPosts, selectPage, selectFiltering, selectParams, selectError } = postsSlice.selectors