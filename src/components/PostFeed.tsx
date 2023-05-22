import { Chat, Heart, Trash } from 'phosphor-react'
import { PostFeedProps } from './types/PostFeed';
import { User } from './User';
import { Link } from 'react-router-dom';

export function PostFeed({ photoProfileUrl, name, text, image, likes, handleLike, comments, postId, deletePubli, verifyIdAuthorPost }: PostFeedProps) {
    

    return (
        <section className='border-b border-gray-300 pt-5 pl-5 pb-5'>

            <div className='flex justify-between items-center'>
                <User name={name} photoUrl={photoProfileUrl} />
                <Trash className={` pr-2 text-white cursor-pointer ${verifyIdAuthorPost == false ? "hidden" : ""}`} onClick={deletePubli} size={35} />

            </div>

            <div className='ml-[66px] mobile:pr-4'>

                <Link to={`/publication?id=${postId}`} >
                    <p className='text-md text-white font-normal mobile:text-sm'>{text}</p>

                    {image &&
                        <img className='max-h-[216px] object-contain mt-2 rounded-[4px]' src={image} alt="" />
                    }
                </Link>

                <div className=' flex  text-white mt-3 text-md gap-10'>
                    <span className='flex items-center gap-2'><Chat size={24} /> {comments} </span>
                    <span className='flex items-center gap-2'><Heart onClick={handleLike} className='cursor-pointer' size={24} /> {likes} </span>
                </div>
            </div>
        </section>
    )
}