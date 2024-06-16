import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');
        setIsLoggedIn(!!token);
        setUserId(storedUserId);
    }, []);

    const login = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setIsLoggedIn(true);
        setUserId(userId);
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        setIsLoggedIn(false);
        setUserId(null);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, userId, login, logout}} >
            { children }
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
