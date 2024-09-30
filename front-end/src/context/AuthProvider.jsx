import { createContext, useState } from 'react';
import { useLocalStorageState } from '../hooks/useLocalStorageState';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useLocalStorageState(false, 'persist');

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                persist,
                setPersist,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;
