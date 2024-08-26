import { Outlet, useNavigate } from 'react-router-dom';
import useUser from './features/authentication/useUser';
import { useEffect } from 'react';

function ProtectedRoutes() {
    const navigate = useNavigate();

    const { isLoading, isAuthenticated } = useUser();

    useEffect(() => {
        if (!isAuthenticated && !isLoading) navigate('/login');
    }, [isAuthenticated, isLoading, navigate]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isAuthenticated) return <Outlet />; // Render the nested routes if authenticated
}

export default ProtectedRoutes;
