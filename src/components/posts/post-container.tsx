import { Avatar } from "@mui/material";
import { DEFAULT_NO_IMG } from "../../util/constants";
import { DateUtils } from "../../util/date-utils";
import { useNavigate } from "react-router-dom";
import { IPost } from "../../interfaces/Ipost";

const PostContainer = ({post}:{post:IPost}) => {
    const navigate = useNavigate();

    const dateUtils = new DateUtils();

    const onShowPost = ({username, id}: IPost) => navigate(`../posts/@${username}/${id}`);

    return (
        <div className="border-b flex items-start justify-between gap-10 px-5 py-5">
            <div className="flex flex-col gap-1 w-[70%]">
                <h2 className="text-2xl cursor-pointer hover:underline" onClick={()=>onShowPost(post)}>
                    {post?.title || "No title"}
                </h2>
                <p className="text-lg text-slate-500 cropped-text">
                    {post?.content}
                </p>

                <div className="flex gap-4 items-center">
                    <Avatar alt="Remy Sharp" src={post?.profileImageUrl}>{post.username.substring(0,2)}</Avatar>
                    <div className="flex flex-col">
                        <div>{post?.username || 'No User'}</div>
                        <div className="text-xs text-slate-400">
                            { dateUtils.transformDate(post?.createdAt) || 'No Created Date'}
                        </div>
                    </div>
                </div>
            </div>
            <img src={post?.imgBannerUrl || DEFAULT_NO_IMG} alt=""  className="w-24 h-24 rounded-md"/>
        </div>
     );
}

export default PostContainer;