import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "components/auth/Login";
import Register from "components/auth/Register";
import Layout from "components/layout";
import Chatroom from "components/chatroom/chatroom";
import { CurrentUserProvider } from "context/CurentUserContext";
import { useCurrentUser } from "context/CurentUserContext";
import Dashboard from "components/dashboard";

export const ROOT = "/";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const DASHBOARD = "/protected/dashboard";
export const PROTECTED = "/protected";
export const CHATROOM = "/chatroom";

function RouterWrapper() {
  const { currentUser } = useCurrentUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROOT} element={<Login />} />
        <Route path={CHATROOM} element={<Chatroom currentUser={currentUser} />} />
        <Route path={LOGIN} element={<Login />} />
        <Route path={REGISTER} element={<Register />} />
        <Route path={PROTECTED} element={<Layout />}>
          <Route index path={DASHBOARD} element={<Dashboard />} />
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
