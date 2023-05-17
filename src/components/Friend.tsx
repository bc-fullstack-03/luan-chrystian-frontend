import { Button } from "./Button"
import { FriendProps } from "./types/FriendProps"
import { User } from "./User"

export function Friend({ name, photoUrl, follows, following }: FriendProps) {

    return (
        <div className='flex flex-col border-b border-gray-300 pl-5 pt-5 pb-8'>

            <User name={name} photoUrl={photoUrl} />

            <div className="mt-3 text-white flex flex-col text-xs ">
                <span>{follows} Seguidores</span>
                <span>Seguindo {following}</span>
            </div>

            <div className="w-[320px] mobile:w-[200px] mt-5">
                <Button title="Seguir" />
            </div>
        </div>
    )
}