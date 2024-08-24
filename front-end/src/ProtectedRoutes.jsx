import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useUser from './features/authentication/useUser';

function ProtectedRoutes() {
    const location = useLocation();

    const { user } = useUser();

    if (!user) {
        // Redirect to login with the current location as state
        return <Navigate to='/login' state={{ from: location }} />;
    }

    return <Outlet />; // Render the nested routes if authenticated
}

export default ProtectedRoutes;
