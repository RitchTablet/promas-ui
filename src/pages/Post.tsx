import { useNavigate, useParams } from "react-router-dom";
import { PostService } from "../services/post.service";
import BannerWithImg from "../components/banners/BannerWithImg";
import { useEffect, useState } from "react";

const Post = ({action}) => {
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [btnAction, setBtnAction] = useState<string>('Publicar');
    const [file, setFile] = useState(null);
    const [imgBanner, setImgBanner] = useState<string>('');
    const [isInputReadOnly, setIsInputReadOnly] = useState<boolean>(false);

    const  { id, username } = useParams();
    const navigate = useNavigate();

    const postService =  new PostService();

    useEffect(()=>{
        setTitle('');
        setContent('');
        if(action === 'edit') {
            setBtnAction("Editar");
            getPost(+id);
        }

        if(action === 'read-only') {
            setIsInputReadOnly(true);
            getPostByUsername(+id, username);
        }
    }, [action]);

    const createFormData = ()=> {
        const formData = new FormData();

        formData.append('file', file);
        formData.append('title', title);
        formData.append('content', content);

        return formData;
    }


    const onSendData = async () => {
        try {
            const formData = createFormData();
            const {data:postData} = action === 'edit' ?
                await postService.editPost(+id, formData) : await postService.createPost(formData);
            if(action === 'create') {
                navigate(`/posts/edit/${postData?.id}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    const getPost = async (id?:number) => {
        try {
            const {data:postData} = await postService.getPost(id);
            const {title, content, imgBannerUrl} = postData;

            setTitle(title);
            setContent(content);
            setImgBanner(imgBannerUrl);
        } catch (error) {
            console.error(error);
            if(error.response.status === 400) {
                const goBack = -1;
                navigate(goBack);
            }
        }
    }

    const getPostByUsername = async (id:number, username:string)=> {
        try {
            const {data:postData} = await postService.getPostByUsername(id, username);
            const {title, content, imgBannerUrl} = postData;

            console.log({title,content,imgBannerUrl});
            setTitle(title);
            setContent(content);
            setImgBanner(imgBannerUrl);
        } catch (error) {
            console.error(error);
            if(error.response.status === 400) {
                const goBack = -1;
                navigate(goBack);
            }
        }
    }

    return (
        <div className="flex flex-col gap-5 px-20">

            <BannerWithImg action={action} imgBanner={imgBanner} onFileChange={(file)=> setFile(file)}/>

            <input className="text-4xl input_post" type="text" placeholder="Titulo"
                value={title}
                onChange={(e) => setTitle(e.target.value)} readOnly={isInputReadOnly}/>

            <div className="flex items-center">
                <textarea className="text-xl input_post h-1/2" placeholder="Contenido"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                readOnly={isInputReadOnly}
                />
            </div>

            {
                action !== 'read-only' &&
                <div className="absolute bottom-4 right-32">
                    <button className="bg-green-400 rounded-md px-2 py-1 text-white" onClick={onSendData}>{btnAction}</button>
                </div>
            }
        </div>
     );
}

export default Post;