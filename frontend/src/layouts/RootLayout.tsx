/**
 * @description Root layout for the entire application
 */

import { Outlet } from "react-router";
import { Navbar } from "../components/Navbar";


export  const Layout = () =>{
    return(
        <div className="h-screen flex flex-col">
            <Navbar></Navbar>
            <main className="flex-1 pt-22 h-full">
                <Outlet/>
            </main>
        </div>
    )
}
