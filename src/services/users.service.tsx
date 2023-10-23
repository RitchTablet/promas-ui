import { AxiosResponse } from "axios";
import Axios from "../util/axios";
import { IUser } from "../interfaces/Iuser";
import { IFollow } from "../interfaces/IFollow";

export class UsersService {
    async getUserByUsername(username: string): Promise<AxiosResponse<IUser>> {
        return Axios.get(`users/${username}`);
    }

    async updateUser(userId:number, user:IUser) {
        return Axios.put(`users/${userId}`, user);
    }

    async updateProfileImage(userId:number, formData: FormData): Promise<AxiosResponse<IUser>> {
        console.log({userId, formData});
        return Axios.post(`users/${userId}/updateImageProfile`, formData);
    }

    getFollowers(id: number): Promise<AxiosResponse<IFollow[]>> {
        return Axios.get(`users/${id}/followers`);
    }

    getFollowings(id: number): Promise<AxiosResponse<IFollow[]>> {
        return Axios.get(`users/${id}/followings`);
    }

    followUser(followingId: number): Promise<AxiosResponse<IFollow>> {
        return Axios.post(`users/follow`, {followingId});
    }

    unfollowUser(followingId: number): Promise<AxiosResponse<IFollow>> {
        return Axios.post(`users/unfollow`, {followingId});
    }

    isFollowing(followingId: number): Promise<AxiosResponse<boolean>> {
        return Axios.get(`users/isFollowing/${followingId}`);
    }
}