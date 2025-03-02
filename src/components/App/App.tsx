import {getPostsApiThunk, selectPage, selectPosts} from "../../slices/postsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch} from "../../servicies/store.ts";
import {PostsList} from "../PostsList/PostsList.tsx";
import { IconButton, InputBase, Pagination, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import _ from "lodash";


function App() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage)
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(getPostsApiThunk({page}))
  }, [dispatch, page])

    const onChange = _.debounce((value: string)=>{
        dispatch(getPostsApiThunk({title: value}))
    }, 1000)

  return (
      <div>
        <Paper component='form' sx={{width: '500px'}}>
            {/*<TextField id='search' label='Search post by title'/>*/}
            <InputBase placeholder='Search post by title' sx={{width: '450px', padding: '10px'}} onChange={(event)=> onChange(event.target.value) }/>
          <IconButton aria-label='search'>
            <SearchIcon></SearchIcon>
          </IconButton>
        </Paper>
        <PostsList posts={posts}/>
        <Pagination count={10} onChange={(event, value: number)=> dispatch(getPostsApiThunk({page: value}))} page={page}/>
      </div>
  )
}

export default App
