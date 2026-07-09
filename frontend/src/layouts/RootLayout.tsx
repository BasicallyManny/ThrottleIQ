/**
 * @description Root layout for the entire application
 */

import { Outlet } from "react-router";


export  const Layout = () =>{
    return(
        <div>
            <main>
                <Outlet/>
            </main>
        </div>
    )
}
