import { useNavigate, useParams } from "react-router-dom";
import { Post } from "../../interfaces/post";
import { PostService } from "../../services/post.service";
import BannerImg from "../banners/BannerImg";
import { useEffect, useState } from "react";


const PostIndex = (props: {action:string}) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const  { id } = useParams();
    const navigate = useNavigate();
    
    const postService =  new PostService();

    useEffect(()=>{
        const {action} = props;
        if(action === 'edit')
            getPost(+id);
    }, []);

    const onSend = async () => {
        try {
            const post: Post = { title, content };
            const {data} = await postService.createPost(post);
        } catch (error) {
            console.error(error);
        }
    }

    const getPost = async (id?:number) => {
        try {
            const {data:postData} = await postService.getPost(id);
            setTitle(postData?.title);
            setContent(postData?.content)
        } catch (error) {
            console.error(error);
            if(error.response.status == 400){
                const goBack = -1;
                navigate(goBack);
            }
        }
    }

    return (
        <div className="flex flex-col gap-5">
            <BannerImg/>
            <input className="text-4xl appearance-none rounded w-full py-2 px-3 bg-transparent text-gray-900 focus:outline-none" type="text" placeholder="Titulo"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            />
            <div className="flex items-center">
                <button className="text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>

                <textarea className="text-xl appearance-none rounded w-full py-2 px-3 bg-transparent text-gray-900 focus:outline-none h-1/2" placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                />

            </div>

            <div className="absolute bottom-4 right-32">
                <button className="bg-green-300 rounded-md px-2 py-1 text-white" onClick={onSend}>Publicar</button>
            </div>
        </div>
     );
}

export default PostIndex;