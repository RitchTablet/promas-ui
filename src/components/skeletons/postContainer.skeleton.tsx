import { Skeleton } from "@mui/material";

const  PostContainerSkeleton = () => {
    return (
        <div className="flex flex-col gap-10">
            {[1,2,3].map((value, index) => (
                <div className="flex gap-5" key={index}>
                    <div className="w-[80%]">
                        <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                        <Skeleton width={110}/>
                    </div>
                    <div>
                        <Skeleton variant="rectangular" width={110} height={100} />
                    </div>
                </div>
            ))}
        </div>
     );
}

export default PostContainerSkeleton;