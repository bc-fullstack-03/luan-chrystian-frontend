import { Button } from "./Button";
import { useState, useEffect } from 'react'
import { FiMenu } from 'react-icons/fi'
import { NewPublication } from "./NewPublication";
import { Link, useNavigate } from "react-router-dom";

export function Menu() {
    const [showMenu, setShowMenu] = useState(false);
    const [modalPubliVisibility, setModalPubliVisiblity] = useState(false);
    const [currentTab, setCurrentTab] = useState('')

    const navigate = useNavigate()

    const toggleModalNewPublication = () => {
        if(window.location.pathname != "/") {
            alert("Ops, no momento é recomendado acionar o botão de nova publicação somente na tela principal, você será redirecionado até lá!")
            navigate("/")
        }
        !modalPubliVisibility ? setModalPubliVisiblity(true) : setModalPubliVisiblity(false)
    };

    function handleMenuInMobile() {
        showMenu == true ? setShowMenu(false) : setShowMenu(true)

    }

    useEffect(() => {
        setCurrentTab(window.location.pathname)

    }, [])

    return (
        <div className=" border-r border-gray-300">

            <FiMenu onClick={handleMenuInMobile} className="hidden mobile:block absolute left-1 bg-cyan-500 rounded-lg  text-black" size={30} />

            <div className={showMenu ? "" : "mobile:hidden"}>

                <div className="flex flex-col items-start text px-5 pt-14 w-[283px] h-screen mobile:w-[80px]"  >

                    <div className="flex items-center gap-6 ">
                        <img src="../src/assets/logo_white.svg" alt="" />
                        <p className="font-bold text-lg text-white"> {showMenu ? '' : 'Parrot'}</p>
                    </div>

                    <ul className="flex flex-col gap-14 mb-14 mt-12">

                        <li>
                            <Link to="/" className={`flex gap-4 items-center text-lg font-bold ${currentTab == '/' ? 'text-cyan-500' : "text-white"}`}  >
                                <img src="../src/assets/home.svg" alt="" /> {showMenu ? '' : 'Página inicial'}
                            </Link>
                        </li>

                        <li className={`${showMenu ? 'hidden' : ''}`}>
                            <Link to="/profile" className={`flex gap-4 items-center text-lg font-bold ${currentTab == '/profile' ? 'text-cyan-500' : "text-white"}`}>
                                <img src="../src/assets/people.svg" alt="" /> {showMenu ? '' : 'Perfil'}
                            </Link>
                        </li>

                        <li>
                            <Link to="/social" className={`flex gap-4 items-center text-lg font-bold ${currentTab == '/social' ? 'text-cyan-500' : "text-white"}`}>
                                <img src="../src/assets/friends.svg" alt="" /> {showMenu ? '' : 'Social'}
                            </Link>
                        </li>
                    </ul>

                    <div className={`w-[200px] text-center ${showMenu ? 'hidden' : ''}`}>
                        <Button title="Nova publicação" onClick={toggleModalNewPublication} />

                        <div className={`${modalPubliVisibility ? '' : 'hidden'}`}>
                            <NewPublication close={toggleModalNewPublication} />
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}