import { createBrowserRouter } from "react-router-dom";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Layout from "components/layout";
import Chatroom from "components/chatroom/chatroom";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DASHBOARD = "/protected/dashboard";
export const PROTECTED = "/protected";
export const CHATROOM = "/chatroom";

export const router = createBrowserRouter([
{path: ROOT, element: <Login/>},
{path: CHATROOM, element: <Chatroom/>},
{path: LOGIN, element: <Login/>},
{path: REGISTER, element: <Register/>},
{path: PROTECTED, element: <Layout/>, children: [{
    path: DASHBOARD,
    element: "Dashboard",
}]},
]);