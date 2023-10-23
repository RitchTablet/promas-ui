export interface IPost {
    id?:number;
    title: string;
    content: string;
    imgBannerUrl?: string;
    username?: string;
    createdAt?: Date;
    profileImageUrl?: string;
}