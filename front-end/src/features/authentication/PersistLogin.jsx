import { useState, useEffect } from 'react';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import { Outlet } from 'react-router-dom';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    // const refresh = useRefreshToken();
    // const { auth } = useAuth();
    // console.log('auth in Persist/Context', auth);

    // useEffect(() => {
    //     const verifyRefreshToken = async () => {
    //         try {
    //             await refresh();
    //         } catch (error) {
    //             console.log(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };

    //     !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
    // }, [auth, refresh]);

    // useEffect(() => {
    //     console.log('isLoading: ', isLoading);
    //     console.log('accessToken: ', JSON.stringify(auth?.accessToken));
    // }, [isLoading, auth]);

    return <>{isLoading ? <p>Loadding...</p> : <Outlet />}</>;
};

export default PersistLogin;
