import { IUser } from "./Iuser";

export interface IFollow {
    id: number;
    follower:IUser;
    following:IUser;
}