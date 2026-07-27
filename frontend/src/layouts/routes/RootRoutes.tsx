import { createBrowserRouter } from "react-router";
import { Layout } from "../RootLayout";
import { Dashboard } from "../../pages/Dashboard";
import { CrashStatsPage } from "../../pages/CrashStatsPage";
import { AccidentMap } from "../../pages/AccidentMap";
import { LandingPage } from "../../pages/LandingPage";

const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path: "/motorcycle-search",
            element: <Dashboard />
        },
        {
            path:"/analytics",
            element: <CrashStatsPage/>
        },
        {
            path: "/accident-map",
            element:<AccidentMap/>
        },
        {
            path: "/",
            element:<LandingPage/>
        }
    ]
}]) 

export default router