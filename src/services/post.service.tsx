import { IPost } from "../interfaces/Ipost";
import { AxiosResponse } from "axios";
import Axios from "../util/axios";
import { dbMain } from "../storage/dexie.db";

export class PostService {
    search(params: {title, content, username}): Promise<AxiosResponse<IPost[]>> {
        return Axios.get(`post/search`, {params});
    }

    getPost(id: number): Promise<AxiosResponse<IPost>> {
        return Axios.get(`post/${id}`);
    }

    getPostByUsername(id: number, username: string): Promise<AxiosResponse<IPost>> {
        return Axios.get(`post/${username}/${id}`);
    }

    async getPosts(): Promise<AxiosResponse<IPost[]>> {
        try {
            const postPromise = Axios.get('post');
            const {data:postsData} = await postPromise;
            await dbMain.posts.bulkPut(postsData);

            return postPromise;
        } catch (error) {
            console.log("Este es mi error personalizado", {error});
        }
    }

    getAllPostsByUsername(username: string): Promise<AxiosResponse<IPost[]>> {
        return Axios.get(`post/allPostsbyUser/${username}`);
    }

    createPost(post: IPost | FormData): Promise<AxiosResponse<IPost>> {
        return Axios.post('post', post);
    }

    editPost(id:number, post: IPost | FormData): Promise<AxiosResponse<IPost>> {
        return Axios.put(`post/${id}`, post);
    }
}