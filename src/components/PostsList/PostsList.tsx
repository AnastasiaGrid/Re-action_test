import {PostItem} from "../PostItem/PostItem.tsx";
import {IPost} from "../../utils/types.ts";
import styles from './PostsList.module.scss'
import {CircularProgress} from "@mui/material";
import {useSelector} from "react-redux";
import {selectError} from "../../slices/postsSlice.ts";

interface IPostsListProps {
    posts: IPost[];
    loading: boolean;
}

export function PostsList({posts,loading}: IPostsListProps) {
    const error = useSelector(selectError) || 'Title not found. Please make sure you entered the entire post title'
    if (loading) return <CircularProgress className={styles.loader}/>
    return (
        <div>
            {posts.length > 0 ? <ul className={styles.list}>
                {posts.map((post, index) => <PostItem key={index} post={post}/>)}
            </ul> : <p className={styles.error}>{error}</p>}
        </div>
    )
}
