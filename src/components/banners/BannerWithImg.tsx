import { useEffect, useRef, useState } from "react";

const BannerWithImg = ({ action, imgBanner, onFileChange }) => {
    const fileInputRef = useRef(null);
    const [imageUrl, setImageUrl] = useState<string>();
    const [isImgLoaded, setIsImgLoaded] = useState<boolean>(false);

    useEffect(()=>{
        if(action === 'edit') {
            setIsImgLoaded(true);
            setImageUrl(imgBanner);
        }
        if(action === 'read-only') {
            if(imgBanner)
                setIsImgLoaded(true);
            setImageUrl(imgBanner);
        }

    },[action, imgBanner]);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        onFileChange(file);

        const reader = new FileReader();
        reader.onload = (event) => {
            const imageUrl = event.target.result.toString();
            setImageUrl(imageUrl);
            setIsImgLoaded(true);
        }
        reader.readAsDataURL(file);
    };

    return (
        <div className="h-96">
            {
               isImgLoaded &&
               <div className="flex flex-col items-center gap-5 h-full">
                    <div className="w-full h-[80%] rounded-lg flex items-center justify-center">
                        <img src={imageUrl} alt=""  className="w-full h-full rounded-lg"/>
                    </div>
                    {
                        action !== 'read-only' &&
                        <div>
                            <button className="bg-green-400 px-5 py-2 rounded-lg text-white" onClick={handleButtonClick}>Actualizar</button>
                            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileSelect}/>
                        </div>
                    }
               </div>
            }
            {
                !isImgLoaded &&
                <div className="flex flex-col items-center gap-5 h-full">
                    <div className="p-5 border-2 border-dashed w-full h-[80%] rounded-lg flex items-center justify-center">
                        <img src={process.env.PUBLIC_URL + '/images/load-img.png'} alt="" className="w-40 h-40"/>
                    </div>
                    {
                        action !== 'read-only' &&
                        <div>
                            <button className="bg-green-400 px-5 py-2 rounded-lg text-white" onClick={handleButtonClick}>Subir</button>
                            <input type="file" accept="image/*" hidden ref={fileInputRef} onChange={handleFileSelect}/>
                        </div>
                    }
                </div>
            }
        </div>
     );
}
 
export default BannerWithImg;