import { createContext } from "react";
import { useProvideAuth } from "../hooks";


const initalstate = {
    user: null,
    login: () => {},
    logout: () => {},
    signup: () => {},
    loading: true 
}

export const AuthContext = createContext(initalstate);

export const AuthProvider = ({ children }) => {
    const auth = useProvideAuth();
    return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
}