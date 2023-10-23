import { IUser } from "../interfaces/Iuser";
import Axios from "../util/axios";
import { TOKEN } from "../util/constants";
import jwtDecode from 'jwt-decode';

export class AuthService {
    isLoggin: boolean = false;
    async login(username:string, password:string) {
        try {
            const {data} =  await Axios.post('auth/login', {username,password});
            const {access_token} = data;
            localStorage.setItem(TOKEN,access_token);
            this.isLoggin = true;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    async register(user: IUser) {
        try {
            const {data} =  await Axios.post('auth/register', user);
            const {access_token} = data;
            localStorage.setItem(TOKEN,access_token);
            this.isLoggin = true;
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    getAccessToken() {
        return localStorage.getItem(TOKEN);
    }

    getUsernameByDecodeJWT() {
        const token = this.getAccessToken();
        const {username} = jwtDecode(token) as any;
        return username;
    }

    getUserByDecodeJWT() {
        const token = this.getAccessToken();
        return jwtDecode(token) as IUser;
    }
}