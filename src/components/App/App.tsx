import {getPostsApiThunk, selectPosts} from "../../slices/postsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {AppDispatch} from "../../servicies/store.ts";
import {PostsList} from "../PostsList/PostsList.tsx";
import {Pagination} from "@mui/material";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState<number>(1);
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(getPostsApiThunk(page))
  }, [dispatch, page])

  return (
      <div>
        <PostsList posts={posts}/>
          <Pagination count={10} onChange={(event, value)=> setPage(value)} page={page}/>
      </div>
  )
}

export default App
