import {IPost} from "./types.ts";

const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export const getPosts = (page: number): Promise<IPost[]> =>
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}`)
        .then((response) => checkResponse<IPost[]>(response))
        .then((data: IPost[]) => {
            if (data) {
                return data
            }
            return Promise.reject(data)})