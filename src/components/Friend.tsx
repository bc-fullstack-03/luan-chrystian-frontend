import { Button } from "./Button"
import { FriendProps } from "../types/FriendProps"

export function Friend({ name, profile, follows, following }: FriendProps) {

    let photoProfileUrl;

    if (profile != null) {
        photoProfileUrl = profile
    } else {
        photoProfileUrl = '../src/assets/User.svg'
    }

    return (
        <div>
            <div className='flex flex-col border-b border-gray-300 pl-5 pt-5 pb-8'>

                <div className="flex items-center">
                    <img className='mr-4 rounded-full w-[50px] h-[50px]' src={photoProfileUrl} alt="" />
                    <p className='font-bold text-white text-lg '>{name}</p>
                </div>

                <div className="mt-3 text-white flex flex-col text-xs ">
                    <span>{follows} Seguidores</span>
                    <span>Seguindo {following}</span>
                </div>

                <div className="w-[320px] mobile:w-[200px] mt-5">
                    <Button title="Seguir" />
                </div>


            </div>
        </div>
    )
}