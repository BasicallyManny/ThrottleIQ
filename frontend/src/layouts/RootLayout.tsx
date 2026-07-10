/**
 * @description Root layout for the entire application
 */

import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";


export  const Layout = () =>{
    return(
        <>
            <Navbar></Navbar>
            <main className="pt-20 overflow-clip">
                <Outlet/>
            </main>
        </>
    )
}
