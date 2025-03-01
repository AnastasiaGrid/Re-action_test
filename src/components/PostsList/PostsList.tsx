import {JSX} from "react";
import {PostItem} from "../PostItem/PostItem.tsx";
import {IPost} from "../../utils/types.ts";
import styles from './PostsList.module.scss'

export function PostsList({posts}: {posts: IPost[]}): JSX.Element {
    return (
        <div>
            <ul className={styles.list}>
                { posts.map((post, index) => <PostItem key={index} post={post}/>)}
            </ul>
        </div>
    )
}