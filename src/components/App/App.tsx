import {getPostsApiThunk, selectPosts} from "../../slices/postsSlice.ts";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {AppDispatch} from "../../servicies/store.ts";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector(selectPosts);
  useEffect(() => {
    dispatch(getPostsApiThunk())
  }, [dispatch])
  console.log(posts)
  return (
    <>
    </>
  )
}

export default App
