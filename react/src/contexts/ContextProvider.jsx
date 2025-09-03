import { useState } from "react";
import { StateContext } from "./StateContext";


export const ContextProvider = ({ children }) => {
    const [user,setUser] = useState({});
    const [token,_setToken] = useState(localStorage.getItem('ACCESS_TOKEN'));
    const [notification,_setNotification] = useState('');

    const setToken = (token) => {
        _setToken(token);
        if (token) {
        localStorage.setItem('ACCESS_TOKEN',token)
    }
    else {
        localStorage.removeItem('ACCESS_TOKEN');
    }
    }

    const setNotification = (message) => {
        _setNotification (message);
        setTimeout(() => {
            _setNotification('')
        }, 3000);
    }

    return (
        <StateContext.Provider value={{
            user,
            token,
            setUser,
            setToken,
            notification,
            setNotification
        }}>

            {children}
        </StateContext.Provider>
    );
};

// Note: useStateContext moved to StateContext.jsx
