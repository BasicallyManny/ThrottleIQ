import { createBrowserRouter } from "react-router";
import { Layout } from "../RootLayout";
import { Dashboard } from "../../pages/Dashboard";
import { CrashStatsPage } from "../../pages/CrashStatsPage";

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
        }
    ]
}])

export default router