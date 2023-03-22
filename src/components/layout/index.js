// import { LOGIN } from 'lib/routes';
// import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from 'hooks/auth';
import Navbar from 'components/navbar/navbar';


export default function Layout() {
    //check if pathname has /protected
    // const { pathname } = useLocation();
    // const navigate = useNavigate();

    //custom hook to get user and checks if user is being fetched
    const { isLoading } = useAuth();

    //if the user is not logged in we want to navigate them to the login (!user should not have access to dashboard)
    // useEffect(() => {
    //     if (pathname.startsWith("/protected") && !user) {
    //         navigate(LOGIN);
    //     }
    // }, [pathname, user, navigate]);

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

