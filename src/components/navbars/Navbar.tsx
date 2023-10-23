import { Avatar, Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useState, MouseEvent, useRef } from "react";
import { PostService } from "../../services/post.service";
import { IPost } from "../../interfaces/Ipost";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { useNavigate } from "react-router-dom";
import { EditNote, Logout } from "@mui/icons-material";
import { AuthService } from "../../services/auth.service";
import SearchMenu from "../menus/search.menu";
import { TOKEN } from "../../util/constants";

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [typing, setTyping] = useState(false);
    const [posts, setPosts] = useState<IPost[]>();

    const searchInputRef = useRef(null);

    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const postService = new PostService();
    const authService = new AuthService();

    const user = authService.getUserByDecodeJWT();

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    const handleSearchInput = (event) => {
        const value = event.target.value;
        const isTyping = value !== '';

        setTyping(isTyping);

        if(isTyping) {
            searchData(value);
        }
    }

    const searchData = async (searchText:string)=> {
        const title = searchText;
        const content = searchText;
        const username = searchText;
        const {data: postData} =  await postService.search({title,content,username})
        setPosts(postData);
    }

    const transformDate = (date: Date)=> {
        const postDate = new Date(date);
        const differenceDate = formatDistanceToNow(postDate, { addSuffix: true, locale: es });
        return differenceDate;
    };

    const onShowPost = ({id, username}: IPost) => {
        onCloseModal();
        navigate(`../posts/@${username}/${id}`);
    };

    const onCloseModal =()=> {
        setTyping(false);
        searchInputRef.current.value = '';
    }

    const onGoHome = () =>  {
        navigate(`/home`);
    }

    const onGoToCreatePost =()=> {
        handleMenuClose();
        navigate(`/posts/create`);
    }

    const onLogout =()=> {
        handleMenuClose();
        localStorage.removeItem(TOKEN);
        navigate('/auth/login')
    }

    return (
        <div className="bg-[#4C7FD0] container_ py-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-[#FAFEFF] font-semibold cursor-pointer" onClick={()=> onGoHome()}>
                <img src={process.env.PUBLIC_URL + '/images/icono.jfif'} alt="" className="w-14 h-14 rounded-full"/>
                <h1 className="text-3xl">Promas</h1>
            </div>

            <div className="flex gap-7">
                <div className="bg-white flex rounded-xl px-2">
                    <button>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                    </button>

                    <input className="text-lg input_post" type="text" placeholder="Search"
                        ref={searchInputRef}
                        onChange={handleSearchInput}/>
                </div>

                {
                    typing &&
                    <div className="fixed top-20 left-0 w-full h-full z-[9999] backdrop-blur-sm backdrop-filter bg-opacity-10" onClick={onCloseModal}>
                        <div className="flex justify-center pl-64">
                            <div className="w-2/3">
                                <SearchMenu posts={posts}/>
                            </div>
                        </div>
                    </div>
                }

                <button
                 id="basic-button"
                 aria-controls={open ? 'basic-menu' : undefined}
                 aria-haspopup="true"
                 aria-expanded={open ? 'true' : undefined}
                 onClick={handleClick}
                >
                    <Avatar alt="Remy Sharp" src={user.profileImageUrl}>{user?.fullName?.substring(0,2)}</Avatar>
                </button>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuClose}
                    MenuListProps={{
                    'aria-labelledby': 'basic-button',
                    }}
                >
                    <div className="w-52 flex flex-col items-center justify-center py-2">
                        <Avatar alt="Remy Sharp" src={user.profileImageUrl} sx={{ width: 70, height: 70 }}>
                            {user?.fullName?.substring(0,2)}
                        </Avatar>
                        <div className="text-lg font-medium">{user?.fullName}</div>
                        <div className="text-base text-slate-400">@{user?.username}</div>
                    </div>
                    <Divider />
                    <MenuItem onClick={onGoToCreatePost}>
                        <ListItemIcon>
                            <EditNote fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Write</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={onLogout}>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        <ListItemText>Logout</ListItemText>
                    </MenuItem>
                </Menu>
            </div>
        </div>
     );
}

export default Navbar;
