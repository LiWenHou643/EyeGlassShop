import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    if (allowedRoles?.includes('GUEST')) {
        return <Outlet />;
    }

    return auth?.role && allowedRoles?.includes(auth?.role) ? (
        <Outlet />
    ) : auth?.username ? (
        <Navigate to='/unauthorized' state={{ from: location }} replace />
    ) : (
        <Navigate to='/login' state={{ from: location }} replace />
    );
};

export default RequireAuth;
