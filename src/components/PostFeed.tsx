import { Chat, Trash } from 'phosphor-react'
import { User } from './User';
import { Link } from 'react-router-dom';
import { FiHeart } from 'react-icons/fi';
import { useEffect, useState } from 'react'
import { PostFeedProps } from '../types/components/PostFeed';
import { PublicationProps } from '../types/entities/PublicationProps';

export function PostFeed({ photoProfileUrl, name, text, image, likes, handleLike, userLikedId, comments, postId, deletePubli, verifyIdAuthorPost, publications }: PostFeedProps) {
    const [publis, setPublis] = useState<PublicationProps[]>([])
    const [isLiked, setIsLiked] = useState<boolean>(false)

    useEffect(() => {
        async function verifyLiked() {
            publications ? setPublis(publications) : console.log('waiting')

            const publi = publis.find(data => data.postId == postId)
            const like = publi?.likes?.some(data => data.userId == userLikedId)

            like ? setIsLiked(true) : setIsLiked(false)
        }

        verifyLiked()

    }, [handleLike])

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

                    <span className='flex items-center gap-2'>
                        <FiHeart onClick={handleLike} className={`${isLiked ? 'fill-cyan-300 text-cyan-300' : ''}`} size={24} /> {likes}
                    </span>
                </div>
            </div>
        </section>
    )
}