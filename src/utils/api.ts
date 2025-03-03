import {IPost} from "./types.ts";

const checkResponse = <T>(res: Response): Promise<T> =>
    res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

export interface IPostsParams {
  page?: number;
  title?: string
}

const clearObjectValues = (obj: Record<string, string>)=> {
    const clearedObj: Record<string, string> = {}
    for (const key in obj) {
        if (obj[key]) clearedObj[key] = obj[key];
    }
    return clearedObj
}

export const getPosts = async ({page = 1, title = ''}: IPostsParams): Promise<IPost[]> => {
    const params = new URLSearchParams(clearObjectValues({
        _page: page? String(page): '',
        title,
    }));
    return fetch(`https://jsonplaceholder.typicode.com/posts?${params}`)
        .then((response) => checkResponse<IPost[]>(response))
}
