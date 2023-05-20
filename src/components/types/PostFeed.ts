export interface PostFeedProps {
    photoProfileUrl: string | null | undefined,
    name: string,
    text: string | null,
    image?: string | null,
    likes?: number,
    comments?: number
    to:string
    deletePubli?: () => void
    verifyIdAuthorPost: boolean
}