 import { PublicationProps } from '../entities/PublicationProps'

 export interface PostFeedProps {
    photoProfileUrl: string | null | undefined,
    name: string,
    text: string | null,
    image?: string | null,
    likes?: number,
    handleLike?: () => void
    userLikedId?: string
    comments?: number
    postId: string
    deletePubli?: () => void
    verifyIdAuthorPost: boolean
    publications? : PublicationProps[]
}