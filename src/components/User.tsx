export function User({ name, photoUrl }: UserProps) {
    
    let photoProfileUrl;

    if (photoUrl != null || photoUrl != undefined) {
        photoProfileUrl = photoUrl
    } else {
        photoProfileUrl = '../src/assets/User.svg'
    }

    return (
        <div className='flex items-center'>

            <img className='mr-4 rounded-full w-[50px] h-[50px]' src={photoProfileUrl} alt="" />

            <p className='font-bold text-white text-lg mobile:text-md mobile:max-w-[150px] '>{name}</p>
        </div>
    )
}