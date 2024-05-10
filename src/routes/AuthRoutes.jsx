import { lazy } from "react";
import { Outlet } from "react-router-dom";

const Login = lazy(() => import("../pages/auth/Login"));
const Dashboard = lazy(() => import("../pages/auth/Dashboard"));

export const authRoutes = {
    path: '/',
    element : <Outlet />,
    children: [
        { path: '/', element: <Dashboard /> },
        { path: '/login', element: <Login /> },
    ]
}

