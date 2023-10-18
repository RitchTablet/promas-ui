import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './components/Layout';
import Blog from './components/Blog';
import Posts from "./components/posts/Posts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path="/" element={<Home />} /> */}
        <Route path="/" element={<Layout />}>
          <Route path="blogs" element={<Blog />} />
          <Route path="posts/*" element={<Posts />} />
          {/* <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NoPage />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
