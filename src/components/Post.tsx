import { Chat, Heart } from 'phosphor-react'
import { PostProps } from '../types/PostProps';

export function Post({ profile, name, text, image, likes, comments }: PostProps) {

    let photoProfileUrl;

    if (profile != null) {
        photoProfileUrl = profile
    } else {
        photoProfileUrl = '../src/assets/User.svg'
    }

    return (
        <section className='border-b border-gray-300 pl-5 pt-5 pb-5'>

            <div className='flex items-center'>

                <img className='mr-4 rounded-full w-[50px] h-[50px]' src={photoProfileUrl} alt="" />

                <p className='font-bold text-white text-lg mobile:text-md'>{name}</p>
            </div>

            <div className='ml-[66px] mobile:pr-4'>
                <div className=' '>
                    <p className='text-md text-white font-normal mobile:text-sm'>{text}</p>

                    {image &&
                        <img className='max-h-[216px] object-contain mt-2 rounded-[4px]' src={image} alt="" />
                    }
                </div>

                <div className=' flex  text-white mt-3 text-md gap-10'>
                    <span className='flex items-center gap-2'><Chat size={24} /> {likes} </span>
                    <span className='flex items-center gap-2'><Heart size={24} /> {comments} </span>
                </div>
            </div>
        </section>
    )
}