import {
    getPostsApiThunk,
    selectFiltering,
    selectIsPostsLoading,
    selectPage,
    selectPosts
} from "../../slices/postsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch} from "../../servicies/store.ts";
import {PostsList} from "../PostsList/PostsList.tsx";
import {Box, CircularProgress, IconButton, InputBase, Pagination, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import _ from "lodash";
import styles from './App.module.scss'


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage)
  const posts = useSelector(selectPosts);
  const isFilter = useSelector(selectFiltering)
    const isLoading = useSelector(selectIsPostsLoading)

  useEffect(() => {
    dispatch(getPostsApiThunk({page}))
  }, [dispatch, page])

    const onChange = _.debounce((value: string)=>{
        dispatch(getPostsApiThunk({title: value}))
    }, 1000)

  return (
      <div className={styles.container}>
          <Paper component='form' sx={{width: '500px'}}>
          <InputBase placeholder='Search post by title' sx={{width: '450px', padding: '10px'}}
                     onChange={(event) => onChange(event.target.value)}/>
          <IconButton aria-label='search' disabled={true}>
              <SearchIcon></SearchIcon>
          </IconButton>
      </Paper>
          {isLoading ?  <CircularProgress className={styles.loader}/> : <PostsList posts={posts}/> }

          {!isFilter ? <Pagination count={10} onChange={(event, value: number) => dispatch(getPostsApiThunk({page: value}))} page={page}/> : null }

      </div>
  )
}

export default App

