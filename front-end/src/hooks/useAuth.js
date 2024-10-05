import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

export const useAuth = () => {
    const { auth, setAuth, persist, setPersist } = useContext(AuthContext);
    return { auth, setAuth, persist, setPersist };
};
