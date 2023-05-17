import { Button } from "./Button";
import { useState } from 'react'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { useAuth } from "../hooks/auth";
import { MenuItem } from "./MenuItem";

export function Menu() {
    const [showMenu, setShowMenu] = useState(false);

    const { signOut }: any = useAuth()

    function handleMenuInMobile() {
        showMenu == true ? setShowMenu(false) : setShowMenu(true)
    }

    function handleLogout() {
        signOut()
    }

    return (
        <div className=" border-r border-gray-300">
            <button onClick={() => handleMenuInMobile()} className="hidden mobile:block text-white bold absolute left-1 bg-cyan-500 rounded-lg">
                <FiMenu size={30} color="black" />
            </button>

            <div className={showMenu ? "" : "mobile:hidden"}>

                <div className="flex flex-col text px-5 pt-14  w-[283px] h-screen mobile:w-[80px]"  >

                    <div className="flex items-center gap-6 ">
                        <img src="../src/assets/logo_white.svg" alt="" />
                        <p className="font-bold text-lg text-white"> {showMenu == true ? '' : 'Parrot'}</p>
                    </div>

                    <ul className="flex flex-col gap-14 mb-14 mt-12">
                        <MenuItem route="/">
                            <img src="../src/assets/home.svg" alt="" /> {showMenu == true ? '' : 'Página inicial'}
                        </MenuItem>

                        <MenuItem route="/profile">
                            <img src="../src/assets/people.svg" alt="" /> {showMenu == true ? '' : 'Perfil'}
                        </MenuItem>

                        <MenuItem route="/friends" >
                            <img src="../src/assets/friends.svg" alt="" /> {showMenu == true ? '' : 'Amigos'}
                        </MenuItem>

                        <MenuItem route="/" onClick={handleLogout}>
                            <FiLogOut size={40} /> {showMenu == true ? '' : 'Sair'}
                        </MenuItem>
                    </ul>

                    <Button title={showMenu == true ? '+' : 'Novo Post'} />
                </div>
            </div>
        </div>
    )
}