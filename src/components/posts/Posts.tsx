import { Route, Routes } from "react-router-dom";
import PostIndex from "./PostIndex";

const Posts = () => {
    return (
        <Routes>
            <Route path="/create" element={<PostIndex action={'create'}/>} />
            <Route path=":id" element={<PostIndex action={'edit'}/>} />
        </Routes>
     );
}
 
export default Posts;