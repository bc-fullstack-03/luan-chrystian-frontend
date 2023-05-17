import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { AuthProviderProps } from "./types/AuthProvidersProps";
import { SignInProps } from "../pages/types/SignInProps";

export const AuthContext = createContext({})

export function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<DataState>({ token: '', userID: '' })

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/auth", { email, password })

            const { token, userID } = response.data

            localStorage.setItem("@Sysmap Parrot:user", JSON.stringify(userID))
            localStorage.setItem("@Sysmap Parrot:token", token)

            console.log("Este é o meu token " + token)
            console.log("Este é o meu ID " + userID)

            api.defaults.headers.common['Authorization'] = `bearer ${token}`

            setData({ token, userID })

        } catch (error) {
            return alert("Não foi possivel realizar o login" + error)
        }
    }

    function signOut() {
        localStorage.removeItem("@Symap Parrot:user")
        localStorage.removeItem("@Sysmap Parrot:token")
        setData({ token: '', userID: '' })
    }

    useEffect(() => {
        const token = localStorage.getItem("@Sysmap Parrot:token")
        const userID = localStorage.getItem("@Sysmap Parrot:user")

        if (token && userID) {
            api.defaults.headers.common['Authorization'] = `bearer ${token}`

            setData({
                token,
                userID: JSON.parse(userID)
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, signOut, user: data.userID }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext);
    return context;
}

interface DataState {
    token: string
    userID: string
}