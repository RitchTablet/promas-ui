import { Outlet } from 'react-router-dom';
import Navbar from "./Navbar";

const Layout = () => {
    return ( 
        <div>
            <Navbar/>
            <div className='container_ py-5'>
                <Outlet/>
            </div>
        </div>
     );
}
 
export default Layout;