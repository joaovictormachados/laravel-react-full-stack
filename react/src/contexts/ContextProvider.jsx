import { useState } from "react";
import { StateContext } from "./StateContext";


export const ContextProvider = ({ children }) => {
    const [user,setUser] = useState({});
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));

    const setToken = (token) => {
        _setToken(token);
        if (token) {
        localStorage.setItem('ACCESS_TOKEN',token)
    }
    else {
        localStorage.removeItem('ACCESS_TOKEN');
    }
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken
        }}>

            {children}
        </StateContext.Provider>
    );
};

// Note: useStateContext moved to StateContext.jsx
