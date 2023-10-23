import { useEffect, useState } from "react";
import { IPost } from "../interfaces/Ipost";

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import PostContainer from "../components/posts/post-container";
import UserInfo from "../components/users/user-info";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.service";
import { IUser } from "../interfaces/Iuser";
import { useParams } from "react-router-dom";
import NoDataSkeleton from "../components/skeletons/no-data.skeleton";
import PostContainerSkeleton from "../components/skeletons/postContainer.skeleton";
import UserInfoSkeleton from "../components/skeletons/user-info.skeleton";
import { PostService } from "../services/post.service";

import { useQuery } from '@tanstack/react-query';

const PostLayout = () => {
    const [value, setValue] = useState('1');

    const  { username } = useParams();

    const postService = new PostService();
    const authService = new AuthService();
    const userService = new UsersService();

    const userReadOnly = !!username;
    const theUsername = username ?? authService.getUsernameByDecodeJWT();

    const { data: allPosts, isPending: postsArePending } = useQuery<IPost[]>({
        queryKey: ['allPosts'],
        queryFn: () => postService.getPosts().then(resp=>resp.data),
    });

    const { data: allMyPosts, isPending: allMyPostsArePending } = useQuery<IPost[]>({
        queryKey: [`${theUsername}-allPosts`],
        queryFn: () => postService.getAllPostsByUsername(theUsername ).then(resp=>resp.data),
    });

    const { data: user, isPending: userIsPending } = useQuery<IUser>({
        queryFn: () => userService.getUserByUsername(theUsername).then(resp=>resp.data),
        queryKey: [`${theUsername}`],
    });


    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    const buildTabList = () => {
        let tabs = userReadOnly ?
        [{label: 'Home'}] :
        [{label: 'All Post'}, {label:'My Posts'}];

        return (
            <TabList onChange={handleChange} aria-label="lab API tabs example">
                {tabs.map((tab, index)=>(<Tab label={tab.label} value={`${index+1}`} key={index} />))}
            </TabList>
        )
    }

    const buildTabPanels = ()=> {
        let tabPanels = userReadOnly ?
            [{tabValue: '1', datasource: allMyPosts},] :
            [{tabValue: '1', datasource: allPosts}, {tabValue: '2', datasource: allMyPosts}];

        return (
            <div>
                {
                    tabPanels.map((panel, index)=> (
                        <TabPanel value={panel?.tabValue} key={index}>
                            <div className="flex flex-col gap-5">
                                {
                                    postsArePending ? <PostContainerSkeleton/> :
                                    <div>
                                        {panel?.datasource?.length == 0 && <NoDataSkeleton/>}
                                        {panel?.datasource?.map((post:IPost, index2)=>(<PostContainer post={post} key={index2}/>))}
                                    </div>
                                }
                            </div>
                        </TabPanel>
                    ))
                }
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5 mt-5">
            <div className="flex gap-10">
                <div className="w-[60%]">
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            {buildTabList()}
                        </Box>
                        {buildTabPanels()}
                    </TabContext>
                </div>

                <div className="w-[40%] border-l p-10">
                    { userIsPending ?
                        <UserInfoSkeleton/> :
                        <div className="sticky top-28">
                            <UserInfo user={user} userReadOnly={userReadOnly}/>
                        </div>
                    }
                </div>
            </div>
        </div>
     );
}

export default PostLayout;

