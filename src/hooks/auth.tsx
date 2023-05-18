import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../services/api";
import { AuthProviderProps } from "./types/AuthProvidersProps";
import { SignInProps } from "../pages/types/SignInProps";

export const AuthContext = createContext({})

export function AuthProvider({ children }: AuthProviderProps) {
    const [data, setData] = useState<DataState>({ token: '', userID: '', email: '' })

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post("/auth", { email, password })

            const { token, userID } = response.data

            localStorage.setItem("@Sysmap Parrot:user", JSON.stringify(userID))
            localStorage.setItem("@Sysmap Parrot:email", email)
            localStorage.setItem("@Sysmap Parrot:token", token)

            api.defaults.headers.common['Authorization'] = `bearer ${token}`

            setData({ token, userID, email })

        } catch (error) {
            return alert("Não foi possivel realizar o login" + error)
        }
    }

    function signOut() {
        localStorage.removeItem("@Symap Parrot:user")
        localStorage.removeItem("@Sysmap Parrot:token")
        localStorage.removeItem("@Sysmap Parrot:email")
        setData({ token: '', userID: '', email: '' })
    }

    useEffect(() => {
        const token = localStorage.getItem("@Sysmap Parrot:token")
        const userID = localStorage.getItem("@Sysmap Parrot:user")
        const email = localStorage.getItem("@Sysmap Parrot:email")

        if (token && userID) {
            api.defaults.headers.common['Authorization'] = `bearer ${token}`

            setData({
                token,
                userID: JSON.parse(userID),
                email: email ? email : ''
            })
        }
    }, [])

    return (
        <AuthContext.Provider value={{ signIn, signOut, user: data.userID, authEmail: data.email }}>
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
    email: string
}