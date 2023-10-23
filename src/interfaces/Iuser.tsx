export interface IUser {
  id?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  username: string;
  password: string;
  email: string;
  fullName: string;
  profileImageUrl?: string;
  facebokProfile?: string;
  gmail?: string;
  githubProfile?: string;
}