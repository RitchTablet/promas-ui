import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from './layouts/Layout';
import PostLayout from './layouts/PostLayout';
import Posts from "./routes/Posts-route";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import LoadingSpinner from "./components/spinners/loading.spinner";


function App() {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="home" element={<PostLayout />}/>
            <Route path="users/:username" element={<PostLayout />}/>
            <Route path="posts/*" element={<Posts />} />
          </Route>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      <LoadingSpinner/>
    </QueryClientProvider>
  );
}

export default App;

