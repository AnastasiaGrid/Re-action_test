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
                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                            {post.title}
                        </Typography>
                        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{post.body}</Typography>
                    </CardContent>
                </React.Fragment>
            </Card>
        </li>
    )
}