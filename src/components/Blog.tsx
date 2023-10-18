import { Avatar } from "@mui/material";
import Banner from "./banners/Banner";
import { useEffect, useState } from "react";
import { PostService } from "../services/post.service";
import { Post } from "../interfaces/post";
import { useNavigate } from "react-router-dom";

const Blogs = () => {
    const [posts, setPosts] = useState<Post[]>();
    const navigate = useNavigate();

    const date = new Date();
    const postService = new PostService();


    useEffect(() => {
        const fetchData = async () => {
          try {
            const {data} = await postService.getPosts();
            setPosts(data);
          } catch (error) {
            console.error('Error:', error);
          }
        };
        fetchData();
      }, [])

    const onShowPost = (index: number) => {
        alert(`on post ${index}`);
        navigate(`../posts/${index}`);
    }

    return ( 
        <div>
            <Banner/>

            <h1>Blogs</h1>
            <div className="flex flex-col gap-5 cursor-pointer">
                {posts?.map((post:Post, index)=>(
                    <div className="border-b flex items-center gap-10" key={index} onClick={()=>onShowPost(post?.id)}>
                        <div className="flex flex-col gap-1 p-5 w-[50%]">
                            <h2 className="text-2xl">{post?.title || "No title"}</h2>
                            <p className="text-lg text-slate-500 texto-recortado">
                                {post?.content}
                            </p>

                            <div className="flex gap-4 items-center">
                                <Avatar alt="Remy Sharp" src="https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg" />
                                <div className="flex flex-col">
                                    <div>Jesus Raul</div>
                                    <div>{date.toDateString()}</div>
                                </div>
                            </div>
                        </div>
                        <img src="https://www.mibauldeblogs.com/wp-content/uploads/2018/03/Kangaroo-at-Sunset-1.jpg" alt=""  className="w-24 h-24 rounded-lg"/>
                    </div>
                    )
                )}
            </div>
        </div>
     );
}
 
export default Blogs;
