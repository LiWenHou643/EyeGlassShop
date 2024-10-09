import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { axiosPrivate } from '../api/axios';
import { useAuth } from './useAuth';
import { useRefreshToken } from './useRefreshToken';

export const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const queryClient = useQueryClient();

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                const userData = queryClient.getQueryData(['auth']);
                const accessToken = userData?.accessToken || auth?.accessToken;

                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            async (response) => {
                const code = response?.data?.code;
                const prevRequest = response?.config;

                if ((code === 1005 || code === 1006) && !prevRequest._retry) {
                    prevRequest._retry = true; // Mark this request as retried
                    const newAccessToken = await refresh();
                    prevRequest.headers[
                        'Authorization'
                    ] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest); // Retry the original request
                }
                return response;
            },
            async (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth, refresh, queryClient]);

    return axiosPrivate;
};
