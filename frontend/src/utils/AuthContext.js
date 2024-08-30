import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role') || '');

    useEffect(() => {
        function handleStorageChange() {
            setRole(localStorage.getItem('role') || '');
        }

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.addEventListener('storage', handleStorageChange);
        };
    }, []);

    return <AuthContext.Provider value={{ role, setRole }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
