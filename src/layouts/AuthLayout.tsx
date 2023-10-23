import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return ( 
        <div>
            <div className="h-screen flex flex-col auth-layout">
                <div className="fixed">
                    <div className="flex items-center gap-3 px-40 py-10 text-slate-500">
                        <img src={process.env.PUBLIC_URL + '/images/icono.jfif'} alt="" className="w-14 h-14 rounded-full"/>
                        <h1 className="text-3xl text-[#4C7FD0]">Promas</h1>
                    </div>
                </div>
                <section className="flex flex-auto items-center justify-center">
                    <Outlet/>
                </section>
            </div>
        </div>
    );
}
 
export default AuthLayout;