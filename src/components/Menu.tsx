import { Button } from "./Button";
import { useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import { NewPublication } from "./NewPublication";
import { Link } from "react-router-dom";

export function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    const [modalPubliVisibility, setModalPubliVisiblity] = useState(false);

    const toggleModalNewPublication = () => {
        !modalPubliVisibility ? setModalPubliVisiblity(true) : setModalPubliVisiblity(false)
    };

    function handleMenuInMobile() {
        showMenu == true ? setShowMenu(false) : setShowMenu(true)
    }

    return (
        <div className=" border-r border-gray-300">

            <FiMenu onClick={handleMenuInMobile} className="hidden mobile:block absolute left-1 bg-cyan-500 rounded-lg  text-black" size={30} />

            <div className={showMenu ? "" : "mobile:hidden"}>

                <div className="flex flex-col text px-5 pt-14 w-[283px] h-screen mobile:w-[80px]"  >

                    <div className="flex items-center gap-6 ">
                        <img src="../src/assets/logo_white.svg" alt="" />
                        <p className="font-bold text-lg text-white"> {showMenu == true ? '' : 'Parrot'}</p>
                    </div>

                    <ul className="flex flex-col gap-14 mb-14 mt-12">

                        <li>
                            <Link to="/" className="flex gap-4 items-center text-lg font-bold text-white"  >
                                <img src="../src/assets/home.svg" alt="" /> {showMenu == true ? '' : 'Página inicial'}
                            </Link>
                        </li>

                        <li>
                            <Link to="/profile" className="flex gap-4 items-center text-lg font-bold text-white">
                                <img src="../src/assets/people.svg" alt="" /> {showMenu == true ? '' : 'Perfil'}
                            </Link>
                        </li>

                        <li>
                            <Link to="/social" className="flex gap-4 items-center text-lg font-bold text-white">
                                <img src="../src/assets/friends.svg" alt="" /> {showMenu == true ? '' : 'Social'}
                            </Link>
                        </li>
                    </ul>

                    <div className="pr-5">
                        <Button onClick={toggleModalNewPublication} title={showMenu == true ? '+' : 'Novo Post'} />

                        <div className={`${modalPubliVisibility ? '' : 'hidden'}`}>
                            <NewPublication close={toggleModalNewPublication} />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}