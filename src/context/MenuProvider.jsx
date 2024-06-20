import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

/**
 * Hook useMenu umożliwia dostęp do kontekstu menu.
 *
 * @returns {Object} Kontekst menu zawierający wybrany klucz i funkcję do jego ustawiania.
 */
export const useMenu = () => useContext(MenuContext);

/**
 * MenuProvider jest komponentem dostarczającym kontekst menu dla aplikacji.
 * Zarządza stanem wybranego klucza menu.
 *
 * @param {Object} props - Właściwości przekazywane do komponentu.
 * @param {JSX.Element} props.children - Elementy potomne, które będą miały dostęp do kontekstu menu.
 * @returns {JSX.Element} Renderowany komponent dostarczający kontekst menu.
 */
export const MenuProvider = ({children}) => {
    const [selectedKey, setSelectedKey] = useState('1');

    return (
        <MenuContext.Provider value={{selectedKey, setSelectedKey}}>
            {children}
        </MenuContext.Provider>
    );
};