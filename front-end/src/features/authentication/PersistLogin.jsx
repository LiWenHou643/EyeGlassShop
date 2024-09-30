import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { RingLoader } from 'react-spinners';
import useRefreshToken from '../../hooks/useRefreshToken';
import useAuth from '../../hooks/useAuth';
import Loading from '../../ui/Loading';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        let isMounted = true;

        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        };

        // Avoids unwanted call to verifyRefreshToken
        !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

        return () => (isMounted = false);
    }, [auth, refresh]);

    return (
        <>
            {!persist ? (
                <Outlet />
            ) : isLoading ? (
                <Loading>
                    <RingLoader color='blue' />
                </Loading>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default PersistLogin;
