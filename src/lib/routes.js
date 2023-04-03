import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Layout from "components/layout";
import Chatroom from "components/chatroom/chatroom";
import { CurrentUserProvider } from "context/CurentUserContext";
import { useCurrentUser } from "context/CurentUserContext";
import Dashboard from "components/dashboard";
import CreatePost from "components/posts/CreatePost";

import AllPosts from "components/posts/AllPosts";
import ProfilePage from "components/Profile/Profile";


export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DASHBOARD = "/protected/dashboard";
export const PROTECTED = "/protected";
export const CHATROOM = "/protected/chatroom";

export const CREATEPOST = "/protected/createpost";
export const ALLPOSTS = "/protected/posts";
export const PROFILE = '/protected/profile';


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
          <Route
            path={CHATROOM}
            element={<Chatroom currentUser={currentUser} />}
          />
          <Route path={CREATEPOST} element={<CreatePost />} />
          <Route path={ALLPOSTS} element={<AllPosts />} />
          <Route path={PROFILE} element={<ProfilePage/>}/>
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
