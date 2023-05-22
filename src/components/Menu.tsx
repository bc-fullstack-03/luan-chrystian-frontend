import { Button } from "./Button";
import { useState } from 'react'
import { FiMenu, FiLogOut } from 'react-icons/fi'
import { useAuth } from "../hooks/contexts/authContext";
import { MenuItem } from "./MenuItem";
import { NewPublication } from "./NewPublication";

export function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    const [modalPubliVisibility, setModalPubliVisiblity] = useState(false);
    const [reload, setReload] = useState(false);


    const toggleModalNewPublication = () => {
        if (modalPubliVisibility == false) {
            setModalPubliVisiblity(true)
        }

        if (modalPubliVisibility == true) {
            setModalPubliVisiblity(false)
        }
    };

    function handleMenuInMobile() {
        showMenu == true ? setShowMenu(false) : setShowMenu(true)
    }

    return (
        <div className=" border-r border-gray-300">

            <FiMenu onClick={ handleMenuInMobile} className="hidden mobile:block absolute left-1 bg-cyan-500 rounded-lg  text-black" size={30}  />

            <div className={showMenu ? "" : "mobile:hidden"}>

                <div className="flex flex-col text px-5 pt-14 w-[283px] h-screen mobile:w-[80px]"  >

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
                    </ul>

                    <div className="pr-5">
                        <Button onClick={toggleModalNewPublication} title={showMenu == true ? '+' : 'Novo Post'} />

                        <div className={`${modalPubliVisibility ? '' : 'hidden'}`}>
                            <NewPublication close={toggleModalNewPublication}  />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}