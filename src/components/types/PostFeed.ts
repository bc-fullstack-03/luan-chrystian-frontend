export interface PostFeedProps {
    photoProfileUrl: string | null | undefined,
    name: string,
    text: string | null,
    image?: string | null,
    likes?: number,
    isLiked?: boolean
    handleLike?: () => void
    comments?: number
    postId: string
    deletePubli?: () => void
    verifyIdAuthorPost: boolean
}