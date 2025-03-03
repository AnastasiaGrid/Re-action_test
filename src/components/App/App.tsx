import {
    getPostsApiThunk,
    selectFiltering,
    selectIsPostsLoading,
    selectPage, selectParams,
    selectPosts, setPageParam, setTitleParam
} from "../../slices/postsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useEffect, useMemo} from "react";
import {AppDispatch} from "../../servicies/store.ts";
import {PostsList} from "../PostsList/PostsList.tsx";
import { IconButton, InputBase, Pagination, Paper} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import _ from "lodash";
import styles from './App.module.scss'
import ClearIcon from '@mui/icons-material/Clear';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const page = useSelector(selectPage)
  const posts = useSelector(selectPosts);
  const isFilter = useSelector(selectFiltering)
    const isLoading = useSelector(selectIsPostsLoading)
    const title = useSelector(selectParams)?.title ?? ''

  useEffect(() => {
    dispatch(getPostsApiThunk({page}))
  }, [dispatch, page])

    const debounceFetchPosts = useMemo(() => _.debounce((value: string)=>{
        dispatch(getPostsApiThunk({title: value}))
    }, 1000) ,[dispatch])

    const onChange = useCallback((value: string) => {
        dispatch(setTitleParam(value))
        debounceFetchPosts(value)
    },[debounceFetchPosts, dispatch])

    const handleDelete=()=> {
        dispatch(getPostsApiThunk({page: 1}))
        dispatch(setPageParam(1))
        dispatch(setTitleParam(''))
    }

    const onSetPage = (page:number) => {
        dispatch(setPageParam(page))
        dispatch(getPostsApiThunk({page: 1}))
    }

  return (
      <div className={styles.container}>
          <Paper component='form' className={styles.paper}>
          <IconButton aria-label='search' disabled={true}>
              <SearchIcon></SearchIcon>
          </IconButton>
          <InputBase placeholder='Search post by title' className={styles.input} autoFocus value={title}
                     onChange={(event) => onChange(event.target.value)}/>
          <IconButton aria-label='search' onClick={()=> handleDelete()} disabled={!title?.length}>
              <ClearIcon></ClearIcon>
          </IconButton>
      </Paper>
      <PostsList posts={posts} loading={isLoading}/>

      {!isFilter && <Pagination count={10} onChange={(_, value: number) => onSetPage(value)} page={page}/> }

      </div>
  )
}

export default App

