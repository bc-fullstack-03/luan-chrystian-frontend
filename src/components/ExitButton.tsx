import { FiLogOut } from "react-icons/fi"
import { useAuth } from "../hooks/auth"


export function ExitButton() {

    const { signOut }: any = useAuth()

    function handleLogout() {
        signOut()
    }

    return (
        <div className="absolute right-2 top-2 text-white text-[12px]">
        <button onClick={handleLogout} className="flex items-center">
            <FiLogOut size={20} /> {'Sair'}
        </button>
    </div>
    )
}