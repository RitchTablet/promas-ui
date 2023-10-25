import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Layout from './layouts/Layout';
import PostLayout from './layouts/PostLayout';
import Posts from "./routes/Posts-route";
import Login from "./pages/auth/Login";
import AuthLayout from "./layouts/AuthLayout";
import Register from "./pages/auth/Register";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import ProtectedRoute from "./components/protected-routes/ProtectedRoute";
import { TOKEN } from "./util/constants";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />}/>

          <Route path="/" element={<Layout />}>
              <Route path="home" element={<PostLayout />}/>
              <Route path="users/:username" element={<PostLayout />}/>
              <Route path="posts/*" element={<Posts />} />
            </Route>
          {/* <Route element={<ProtectedRoute canActivate={user} redirectPath='/auth/login' />}></Route> */}

          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      {/* <LoadingSpinner/> */}
      <ToastContainer/>
    </QueryClientProvider>
  );
}

export default App;

