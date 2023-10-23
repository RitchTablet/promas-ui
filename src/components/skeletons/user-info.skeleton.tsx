import { Skeleton } from "@mui/material";

const  UserInfoSkeleton = () => {
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-2">
                <Skeleton variant="circular" width={86} height={86} />
                <div className="w-[40%]">
                    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                    <Skeleton />
                </div>
            </div>
            <div>
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
            </div>

            <div>
                <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
                {[1,2,3,4,5,6,7,8,9,1,3,4].map((data, index)=> (<Skeleton key={index}/>))}
            </div>
        </div>
     );
}

export default UserInfoSkeleton;