import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Posts from "components/posts/Posts";
import Layout from "components/layout";
import SinglePost from "components/posts/SinglePost";
import Chatroom from "components/chatroom/chatroom";
import { CurrentUserProvider } from "context/CurentUserContext";
import { useCurrentUser } from "context/CurentUserContext";
import Dashboard from "components/dashboard";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const POSTS = "/posts";
export const SINGLEPOST = `/posts/:id`;
export const DASHBOARD = "/protected/dashboard";
export const PROTECTED = "/protected";
export const CHATROOM = "/protected/chatroom";

export const router = createBrowserRouter([
{path: ROOT, element: "Public Root"},
{path: LOGIN, element: <Login/>},
{path: REGISTER, element: <Register/>},
{path: POSTS, element: <Posts/>},
{path: SINGLEPOST, element: <SinglePost/>},
{path: PROTECTED, element: <Layout/>, children: [{
    path: DASHBOARD,
    element: "Dashboard",
}]},
]);

function RouterWrapper() {
  const { currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT} element={<Login />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={PROTECTED} element={<Layout />}>
        <Route index path={DASHBOARD} element={<Dashboard />} />
        <Route path={CHATROOM} element={<Chatroom currentUser={currentUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export const router = (
  <CurrentUserProvider>
    <RouterWrapper />
  </CurrentUserProvider>
);

