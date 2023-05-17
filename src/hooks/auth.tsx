import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { AuthProviderProps } from "../types/AuthProvidersProps";

export const AuthContext = createContext({})

export function AuthProvider({children}: AuthProviderProps) {






    
    return (
        <AuthContext.Provider value={{}}>
            {children}
        </AuthContext.Provider>
    )
}