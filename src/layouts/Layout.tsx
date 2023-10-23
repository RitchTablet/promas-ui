import { Outlet } from 'react-router-dom';
import Navbar from "../components/navbars/Navbar";

const Layout = () => {
    return (
        <div>
            <div className='sticky top-0 z-50'>
                <Navbar/>
            </div>
            <div className='container_ py-5'>
                <Outlet/>
            </div>
        </div>
     );
}

export default Layout;