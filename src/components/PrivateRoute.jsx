import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

/**
 * Komponent PrivateRoute jest komponentem funkcyjnym Reacta, który służy do ochrony tras w aplikacji.
 * Sprawdza, czy użytkownik jest zalogowany, i odpowiednio przekierowuje do strony logowania, jeśli nie jest zalogowany.
 *
 * @returns {JSX.Element} Renderowany komponent ochrony trasy.
 */
const PrivateRoute = () => {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
