import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthProvider';

function ProtectedRoutes() {
    const location = useLocation();
    const { auth } = useAuth();

    if (!auth) {
        // Redirect to login with the current location as state
        return <Navigate to='/login' state={{ from: location }} />;
    }

    return <Outlet />; // Render the nested routes if authenticated
}

export default ProtectedRoutes;
