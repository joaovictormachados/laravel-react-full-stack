import { createContext, useContext } from "react";

// Central context definition and convenience hook
export const StateContext = createContext({
  user: {},
  token: null,
  notification: null,
  setUser: () => {},
  setToken: () => {},
  setNotification: () => {},
});

export const useStateContext = () => useContext(StateContext);
