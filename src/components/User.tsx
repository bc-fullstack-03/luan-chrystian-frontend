export function User({ name, photoUrl, username }: UserProps) {

    let photoProfileUrl;

    if (photoUrl != null || photoUrl != undefined) {
        photoProfileUrl = photoUrl
    } else {
        photoProfileUrl = '../src/assets/User.svg'
    }

    return (
        <div className='flex items-center'>

            <img className='mr-4 rounded-full w-[50px] h-[50px]' src={photoProfileUrl} alt="" />

            <div>
                <p className='font-bold text-white text-lg mobile:text-md mobile:max-w-[150px] '>{name}</p>
                <p className="flex-wrap text-gray-300 font-bold text-xs -mt-2">{username ? '@' : ''}{username}</p>
            </div>
        </div>
    )
}