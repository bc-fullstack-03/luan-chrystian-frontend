import { Button } from "./Button";
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { Link } from "react-router-dom"

export function Menu() {
    const [showMenu, setShowMenu] = useState(false);

    function handleMenuInMobile() {
        showMenu == true ? setShowMenu(false) : setShowMenu(true)
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
                        <li >
                            <Link className="text-lg font-bold text-white flex gap-4 items-center" to="/home">
                                <img src="../src/assets/home.svg" alt="" /> {showMenu == true ? '' : 'Página inicial'}
                            </Link>
                        </li>

                        <li>
                            <Link className="flex gap-4 items-center text-lg font-bold text-white" to="/profile">
                                <img src="../src/assets/people.svg" alt="" /> {showMenu == true ? '' : 'Perfil'}
                            </Link>
                        </li>

                        <li>
                            <Link className="flex gap-4 items-center text-lg font-bold text-white" to="/friends">
                                <img src="../src/assets/friends.svg" alt="" /> {showMenu == true ? '' : 'Amigos'}
                            </Link>
                        </li>
                    </ul>

                    <Button title={showMenu == true ? '+' : 'Novo Post'} />
                </div>
            </div>
        </div>
    )
}