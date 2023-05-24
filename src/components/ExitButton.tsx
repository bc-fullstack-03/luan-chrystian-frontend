import { FiLogOut } from "react-icons/fi"
import { useAuth } from "../hooks/contexts/authContext"
import { useNavigate } from "react-router"


export function ExitButton() {

    const { signOut }: any = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        signOut()
        navigate("/")
    }

    return (
        <div className="absolute right-2 top-2 text-white text-[12px]">
            <button onClick={handleLogout} className="flex items-center">
                <FiLogOut size={20} /> {'Sair'}
            </button>
        </div>
    )
}