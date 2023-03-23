// import { LOGIN } from 'lib/routes';
// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
import Navbar from 'components/navbar/navbar';
import Chatroom from 'components/chatroom/chatroom';

export default function Layout({ currentUSer }) {

    const { isLoading } = useAuth();

    if (isLoading) {
        return "Loading..."
    }

    return (
        <>
        <Navbar />
        <Chatroom currentUser={currentUSer} />
        <Outlet />
        </>
    );
}

