import { Route, Routes } from "react-router-dom";
import Post from "../pages/Post";

const Posts = () => {
    return (
        <Routes>
            <Route path="/create" element={<Post action={'create'}/>} />
            <Route path="/edit/:id" element={<Post action={'edit'}/>} />
            <Route path="/:username/:id" element={<Post action={'read-only'}/>} />
        </Routes>
     );
}
 
export default Posts;