import {Card, CardContent, Typography} from "@mui/material";
import React from "react";
import {IPost} from "../../utils/types.ts";
import styles from "./PostItem.module.scss";

export function PostItem({post}: {post: IPost}) {
    return (
        <li className={styles.listItem}>
            <Card>
                <React.Fragment>
                    <CardContent>
                        <h3 className={styles.title}> {post.title} </h3>
                        <p className={styles.description}> {post.body}</p>
                    </CardContent>
                </React.Fragment>
            </Card>
        </li>
    )
}