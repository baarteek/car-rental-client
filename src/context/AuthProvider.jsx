import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';

const AuthContext = createContext(null);


/**
 * AuthProvider jest komponentem dostarczającym kontekst autoryzacji dla aplikacji.
 * Zarządza stanem logowania użytkownika, przechowuje jego ID oraz sprawdza status autoryzacji.
 *
 * @param {Object} props - Właściwości przekazywane do komponentu.
 * @param {JSX.Element} props.children - Elementy potomne, które będą miały dostęp do kontekstu autoryzacji.
 * @returns {JSX.Element} Renderowany komponent dostarczający kontekst autoryzacji.
 */
export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
         /**
         * Funkcja asynchroniczna sprawdzająca status autoryzacji użytkownika.
         * Pobiera token z localStorage i wysyła zapytanie do API, aby zweryfikować, czy użytkownik jest zalogowany.
         */
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

    /**
     * Loguje użytkownika, ustawiając token i ID użytkownika w localStorage oraz aktualizując stan.
     *
     * @param {string} token - Token autoryzacji użytkownika.
     * @param {string} userId - ID użytkownika.
     */
    const login = (token, userId) => {
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        setIsLoggedIn(true);
        setUserId(userId);
    };

      /**
     * Wylogowuje użytkownika, usuwając token i ID użytkownika z localStorage oraz aktualizując stan.
     */
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

/**
 * Hook useAuth umożliwia dostęp do kontekstu autoryzacji.
 *
 * @returns {Object} Kontekst autoryzacji zawierający stan logowania, ID użytkownika oraz funkcje logowania i wylogowania.
 */
export const useAuth = () => useContext(AuthContext);
