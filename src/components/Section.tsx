import { FiLogOut } from "react-icons/fi"
import { useAuth } from "../hooks/contexts/authContext"
import { ReactNode } from 'react'
import { useNavigate } from "react-router"

export function Section({ children }: {children: ReactNode}) {

    const { signOut }: any = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        navigate("/")
        signOut()
    }

    return (
        <section className="pt-3 flex flex-col flex-1">

            <div className="absolute right-2 top-2 text-white text-[12px]">
                <button onClick={handleLogout} className="flex items-center">
                    <FiLogOut size={20} /> {'Sair'}
                </button>
            </div>

            {children}
        </section >
    )
}