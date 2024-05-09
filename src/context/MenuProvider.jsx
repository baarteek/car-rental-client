import { createContext, useContext, useState } from "react";

const MenuContext = createContext();

export const useMenu = () => useContext(MenuContext);

export const MenuProvider = ({children}) => {
    const [selectedKey, setSelectedKey] = useState('1');

    return (
        <MenuContext.Provider value={{selectedKey, setSelectedKey}}>
            {children}
        </MenuContext.Provider>
    );
};