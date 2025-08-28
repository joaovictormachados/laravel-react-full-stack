import { createContext, useContext } from "react";

// Central context definition and convenience hook
export const StateContext = createContext({
  user: {},
  token: null,
  setUser: () => {},
  setToken: () => {},
});

export const useStateContext = () => useContext(StateContext);
