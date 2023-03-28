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
export const POSTS = "/protected/posts";
export const SINGLEPOST = `/protected/posts/:id`;
export const DASHBOARD = "/protected/dashboard";
export const PROTECTED = "/protected";
export const CHATROOM = "/protected/chatroom";



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
        <Route path={POSTS} element={<Posts />} />
        <Route path={SINGLEPOST} element={<SinglePost />} />
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

