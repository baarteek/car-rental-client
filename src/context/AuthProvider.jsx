import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/api/v1/auth/check', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (response.status === 200) {
                        const storedUserId = localStorage.getItem('userId');
                        setIsLoggedIn(true);
                        setUserId(storedUserId);
                    } else {
                        logout();
                    }
                } catch (error) {
                    console.error('Authentication check failed:', error);
                    logout();
                }
            }
            setLoading(false);
        };

        checkAuthStatus();
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
        <AuthContext.Provider value={{isLoggedIn, userId, login, logout}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
