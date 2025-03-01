import {getPostsApiThunk, selectPosts} from "../../slices/postsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch} from "../../servicies/store.ts";
import {PostsList} from "../PostsList/PostsList.tsx";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(getPostsApiThunk())
  }, [dispatch])
  console.log(posts)
  return (
      <>
        <PostsList posts={posts}/>
      </>
  )
}

export default App
