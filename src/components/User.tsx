import { UserProps } from "../types/UserProps";


export function User({ name, photoUrl }: UserProps) {
    
    let photoProfileUrl;

    if (photoUrl != null) {
        photoProfileUrl = photoUrl
    } else {
        photoProfileUrl = '../src/assets/User.svg'
    }

    return (
        <div className='flex items-center'>

            <img className='mr-4 rounded-full w-[50px] h-[50px]' src={photoProfileUrl} alt="" />

            <p className='font-bold text-white text-lg mobile:text-md'>{name}</p>
        </div>
    )
}