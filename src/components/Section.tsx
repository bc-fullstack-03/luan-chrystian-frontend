import { SectionProps } from "./types/SectionProps";
import { FiLogOut } from "react-icons/fi"
import { useAuth } from "../hooks/contexts/authContext"


export function Section({ children }: SectionProps) {

    const { signOut }: any = useAuth()

    function handleLogout() {
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