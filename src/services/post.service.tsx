import { Post } from "../interfaces/post";
import axios, { AxiosResponse } from "axios";

export class PostService {

    getPost(id: number): Promise<AxiosResponse<Post>> {
        return axios.get(`http://localhost:3000/api/v1/post/${id}`);
    }

    getPosts() {
        return axios.get('http://localhost:3000/api/v1/post');
    }

    createPost(post: Post) {
        return axios.post('http://localhost:3000/api/v1/post', post);
    }
}