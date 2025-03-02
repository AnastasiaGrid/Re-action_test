import {JSX} from "react";
import {PostItem} from "../PostItem/PostItem.tsx";
import {IPost} from "../../utils/types.ts";
import styles from './PostsList.module.scss'

export function PostsList({posts}: {posts: IPost[]}): JSX.Element {
    return (
        <div>
            {posts.length > 0 ? <ul className={styles.list}>
                {posts.map((post, index) => <PostItem key={index} post={post}/>)}
            </ul> : <p className={styles.error}>Title not found. Please make sure you entered the entire post title</p>}
        </div>
    )
}
