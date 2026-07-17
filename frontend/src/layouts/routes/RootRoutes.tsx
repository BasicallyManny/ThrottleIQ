import { createBrowserRouter } from "react-router";
import { Layout } from "../RootLayout";
import { Dashboard } from "../../pages/Dashboard";

const router = createBrowserRouter([{
    element: <Layout />,
    children: [
        {
            path: "/",
            element: <Dashboard />
        }
    ]
}])

export default router