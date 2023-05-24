import { createContext, useContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import { api } from "../../services/api";
import { useAuth } from "./authContext";

interface PublicationProviderProps {
    children: ReactNode
}

export const UserContext = createContext({})

export function UserProvider({ children }: PublicationProviderProps) {
    const { authEmail }: any = useAuth()
    const [data, setData] = useState<User>()

    useEffect(() => {
        async function fetchUserData() {
            const email: string = authEmail.replace(/"/g, "")
            const response = await api.get(`/user/email?email=${email}`)
            setData(response.data)
        }

        fetchUserData()
    }, [data])


    return <UserContext.Provider value={{ data }} >
        {children}
    </UserContext.Provider>
}

export function useDataUser() {
    const context = useContext(UserContext)

    return context
}