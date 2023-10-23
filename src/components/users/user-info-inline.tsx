import { Avatar } from "@mui/material";
import { IUser } from "../../interfaces/Iuser";
import { useNavigate } from "react-router-dom";

const UserInfoInline = ({user}: {user:IUser}) => {
    const navigate = useNavigate();

    const onUserProfile = ({username}: IUser) => navigate(`../users/@${username}`);

    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">
                <Avatar alt="Remy Sharp"
                src={user?.profileImageUrl}
                sx={{ width: 25, height: 25 }}
                />
                <div className="text-sm cursor-pointer hover:underline" onClick={()=> onUserProfile(user)}>{user?.fullName}</div>
            </div>
            <button className="hover:bg-gray-100 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                </svg>
            </button>
        </div>
     );
}

export default UserInfoInline;