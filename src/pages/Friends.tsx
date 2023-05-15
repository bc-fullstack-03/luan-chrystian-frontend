import { Friend } from "../components/Friend"
import { Menu } from "../components/Menu"


export const Friends = function () {

    return (
        <div className="min-w-screen min-h-screen bg-gray-900 flex ">

            <Menu />

            <div className="pt-3 flex flex-col flex-1">

                <h2 className="font-bold text-lg text-white pl-5 mb-4 mobile:text-center">Amigos</h2>

                <div className="overflow-x-auto h-[775px] notebook:max-h-[480px]">
                    <Friend name={"Usuário"} follows={1000} following={800} />
                    <Friend name={"Usuário"} follows={1000} following={800} />
                    <Friend name={"Usuário"} follows={1000} following={800} />
                    <Friend name={"Usuário"} follows={1000} following={800} />
                </div>
            </div>
        </div>
    )
}