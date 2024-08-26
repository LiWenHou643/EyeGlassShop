import { axiosPrivate } from '../services/axios';
import { useRefreshToken } from './useRefreshToken';

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
};
