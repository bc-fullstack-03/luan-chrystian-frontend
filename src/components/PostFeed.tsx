import { Chat, Heart } from 'phosphor-react'
import { PostFeedProps } from './types/PostFeed';
import { User } from './User';
import { Link } from 'react-router-dom';

export function PostFeed({ photoUrl, name, text, image, likes, comments }: PostFeedProps) {

    return (
        <section className='border-b border-gray-300 pt-5 pl-5 pb-5'>

            <User name={name} photoUrl={photoUrl} />

            <div className='ml-[66px] mobile:pr-4'>

                <Link to="/publication" >
                    <p className='text-md text-white font-normal mobile:text-sm'>{text}</p>

                    {image &&
                        <img className='max-h-[216px] object-contain mt-2 rounded-[4px]' src={image} alt="" />
                    }
                </Link>

                <div className=' flex  text-white mt-3 text-md gap-10'>
                    <span className='flex items-center gap-2'><Chat size={24} /> {likes} </span>
                    <span className='flex items-center gap-2'><Heart size={24} /> {comments} </span>
                </div>
            </div>
        </section>
    )
}