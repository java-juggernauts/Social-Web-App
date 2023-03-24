
import { Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
import Navbar from 'components/navbar/navbar';


export default function Layout({ currentUSer }) {

    const { isLoading } = useAuth();

    if (isLoading) {
        return "Loading..."
    }

    return (
        <>
        <Navbar />
        <Outlet />
        </>
    );
}

