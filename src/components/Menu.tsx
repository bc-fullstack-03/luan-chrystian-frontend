import { Button } from "./Button";

export function Menu() {

    return (
        <div className=" flex flex-col  text px-5 pt-14  w-[283px] h-screen border-r border-gray-300">

            <div className="flex items-center gap-6 ">
                <img src="../src/assets/logo_white.svg" alt="" />
                <p className="font-bold text-lg text-white">Parrot</p>
            </div>

            <ul className="flex flex-col gap-14 mb-14 mt-12">
                <li>
                    <a className="text-lg font-bold text-white flex gap-4 items-center" href="">
                        <img src="../src/assets/home.svg" alt="" /> Página inicial
                    </a>
                </li>

                <li>
                    <a className="flex gap-4 items-center text-lg font-bold text-white" href="">
                        <img src="../src/assets/people.svg" alt="" /> Perfil
                    </a>
                </li>

                <li>
                    <a className="flex gap-4 items-center text-lg font-bold text-white" href="">
                        <img src="../src/assets/friends.svg" alt="" /> Amigos
                    </a>
                </li>
            </ul>

            <Button title="Novo post" />
        </div>
    )
}