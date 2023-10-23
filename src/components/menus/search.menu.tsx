import { IPost } from "../../interfaces/Ipost";
import { useNavigate } from "react-router-dom";
import PostContainer from "../posts/post-container";
import NoDataSkeleton from "../skeletons/no-data.skeleton";

const SearchMenu = ({posts}:{posts:IPost[]}) => {
    const navigate = useNavigate();

    const onShowPost = ({id, username}: IPost) => navigate(`/posts/@${username}/${id}`);

    return (
        <div>
            <div className="bg-white p-2 rounded-md max-h-96 shadow-2xl overflow-auto">
                {posts?.map((post, index)=>
                    (<div className="cursor-pointer hover:bg-gray-50"
                    onClick={()=> onShowPost(post)}
                    key={index}>
                        <PostContainer post={post}/>
                    </div>)
                )}
                {posts?.length === 0 && <NoDataSkeleton/>
                }
            </div>
        </div>
     );
}
 
export default SearchMenu;