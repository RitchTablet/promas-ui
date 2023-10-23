import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Avatar, Box, Tab, TextField, InputAdornment } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { IUser } from "../../interfaces/Iuser";
import { UsersService } from "../../services/users.service";
import { IFollow } from "../../interfaces/IFollow";
import UserInfoInline from "./user-info-inline";

const UserInfo = ({user, userReadOnly}: {user:IUser, userReadOnly:boolean}) => {
    const [fullName, setFullName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [facebook, setFacebook] = useState<string>();
    const [gmail, setGmail] = useState<string>();
    const [github, setGithub] = useState<string>();
    const [followsFollowers, setFollowsFollowers] = useState<IFollow[]>();
    const [followsFollowings, setFollowsFollowings] = useState<IFollow[]>();
    const [isFollowing, setIsFollowing] = useState<boolean>();
    const [isEdit, setIsEdit] = useState(false);
    const [profileImageUrl, setProfileImageUrl] = useState<string>();

    const fileInputRef = useRef(null);

    const [value, setValue] = useState('1');

    const userService = new UsersService();

    useEffect(()=>{
        if(!user) return;

        setAboutMeData(user);
        setProfileImageUrl(user?.profileImageUrl);

        const fetchData = async () => {
            try {
                const {data:isFollowingData} = await userService.isFollowing(user?.id);
                setIsFollowing(isFollowingData);

                const followersPromise  = userService.getFollowers(user?.id);
                const followingsPromise  = userService.getFollowings(user?.id);

                const [{data:follawersData},{data: followingsData}] = await Promise.all([followersPromise, followingsPromise]);

                setFollowsFollowers(follawersData);
                setFollowsFollowings(followingsData);
            } catch (error) {
                console.error('Error:', error);
            }
        };
          fetchData();
    }, [user]);


    const setAboutMeData =(user:IUser)=> {
        setFullName(user?.fullName);
        setEmail(user?.email);
        setFacebook(user?.facebokProfile);
        setGmail(user?.gmail);
        setGithub(user?.githubProfile);
    }

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const onRedirectTo = (url:string)=> {
        window.open(url, '_blank');
    }

    const buildTabList = () => {
        let tabs = userReadOnly ?
            [{label: 'Followers'}, {label: 'Followings'}] :
            [{label: 'Followers'}, {label: 'Followings'}, {label: 'About Me'}];

        return (
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                {tabs.map((tab, index)=>(<Tab label={tab.label} value={`${index+1}`} key={index} />))}
            </TabList>
        )
    }

    const onFollow = async (followingId: number)=> {
        await userService.followUser(followingId);
        setIsFollowing(true);
    }

    const onUnFollow = async (followingId: number)=> {
        await userService.unfollowUser(followingId);
        setIsFollowing(false);
    }

    const onEditAbout = ()=> {
        setIsEdit(true);
    }

    const onSaveAboutMe = async () => {
        const partialUser:Partial<IUser> = {
            fullName,
            email,
            facebokProfile: facebook,
            gmail,
            githubProfile:github
        }

        const userId = user?.id;
        await userService.updateUser(userId, partialUser as IUser);
        setIsEdit(false);
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];

        const formData = new FormData();
        formData.append('file', file);

        const userId = user?.id;
        const {data:userdata} = await userService.updateProfileImage(userId, formData);
        const {profileImageUrl} = userdata;
        setProfileImageUrl(profileImageUrl);
    };

    return (
        <div className="flex flex-col gap-10 ">
            <div className="flex items-center gap-4">
                <div className="relative">
                    <button className="bg-gray-100 hover:bg-gray-200 font-medium w-7 h-7 rounded-full flex items-center justify-center absolute right-1 -bottom-1 z-40" onClick={handleButtonClick}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                    </button>
                    <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileSelect}/>
                    <Avatar alt="Remy Sharp"
                    src={profileImageUrl}
                    sx={{ width: 86, height: 86 }}
                    />
                </div>
                <div>
                    <div className="text-lg font-medium">{user?.fullName}</div>
                    <div className="text-base text-slate-400">@{user?.username}</div>
                    <div className="text-sm text-slate-400 flex gap-5">
                        <div>15.k Followers</div>
                        <div>15.k Followers</div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-between">
                {userReadOnly && <div className="flex gap-3">
                    {   !isFollowing ?
                        <button type="button" className="bg-[#4C7FD0] py-2 w-24 rounded-2xl text-white shadow-xl"
                        onClick={()=> onFollow(user?.id)}>
                            Follow
                        </button> :
                        <button type="button" className="bg-[#4C7FD0] py-2 w-24 rounded-2xl text-white shadow-xl"
                        onClick={()=> onUnFollow(user?.id)}>
                            Unfollow
                        </button>
                    }

                    {/* <button className="bg-[#4C7FD0] w-10 h-10 rounded-full text-white shadow-xl flex items-center justify-center"
                    onClick={()=> alert('send message!')}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    </button> */}
                </div>}

                <div className="flex gap-3 mt-3">
                    <button className="bg-gray-100 hover:bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center" 
                    onClick={()=>onRedirectTo(user?.facebokProfile)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" className="text-xs">
                            <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                        </svg>
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center"
                    onClick={()=>onRedirectTo(user?.gmail)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512" className="text-xs">
                            <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                        </svg>
                    </button>
                    <button className="bg-gray-100 hover:bg-gray-200 rounded-full w-7 h-7 flex items-center justify-center"
                    onClick={()=>onRedirectTo(user?.githubProfile)}>
                        <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512" className="text-xs">
                            <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        {buildTabList()}
                    </Box>
                    <TabPanel value="1" className="max-h-96 overflow-auto">
                        <div className="flex flex-col gap-3">
                            {followsFollowers?.map((follow, index) => (<UserInfoInline user={follow?.follower} key={index}/>))}
                        </div>
                    </TabPanel>
                    <TabPanel value="2" className="max-h-96 overflow-auto">
                        <div className="flex flex-col gap-3">
                            {followsFollowings?.map((follow, index) => (<UserInfoInline user={follow?.following} key={index}/>))}
                        </div>
                    </TabPanel>
                    <TabPanel value="3">
                        <div className="flex justify-end mb-5">
                            { !isEdit &&
                                <button className="bg-[#4C7FD0] text-white font-medium w-20 py-1 rounded-xl flex gap-1 items-center justify-center pr-1" onClick={onEditAbout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                    </svg>
                                    Edit
                                </button>
                            }
                            { isEdit &&
                                <button className="bg-[#4C7FD0] text-white font-medium w-20 py-1 rounded-xl flex gap-1 items-center justify-center pr-1" onClick={onSaveAboutMe}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                                    </svg>
                                    Save
                                </button>
                            }
                        </div>
                        <div className="flex flex-col gap-3">
                            <TextField id="outlined-basic" label="FullName" variant="outlined"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            InputProps={{
                                readOnly : !isEdit,
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                    </InputAdornment>
                                ),
                            }}
                            />
                            <TextField id="outlined-basic" label="Email" variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            InputProps={{
                                readOnly : !isEdit,
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                                    </svg>
                                    </InputAdornment>
                                ),
                            }}
                            />
                            <TextField id="outlined-basic" label="Facebook" variant="outlined"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                            InputProps={{
                                readOnly : !isEdit,
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 320 512" className="text-base">
                                        <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                    </svg>
                                    </InputAdornment>
                                ),
                            }}
                            />
                            <TextField id="outlined-basic" label="Gmail" variant="outlined"
                            value={gmail}
                            onChange={(e) => setGmail(e.target.value)}
                            InputProps={{
                                readOnly : !isEdit,
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 488 512" className="text-base">
                                        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/>
                                    </svg>
                                    </InputAdornment>
                                ),
                            }}
                            />
                            <TextField id="outlined-basic" label="Github" variant="outlined"
                            value={github}
                            onChange={(e) => setGithub(e.target.value)}
                            InputProps={{
                                readOnly : !isEdit,
                                startAdornment: (
                                    <InputAdornment position="start">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 496 512" className="text-base">
                                        <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"/>
                                    </svg>
                                    </InputAdornment>
                                ),
                            }}
                            />
                        </div>
                    </TabPanel>
                </TabContext>
            </div>
        </div>
     );
}
 
export default UserInfo;
