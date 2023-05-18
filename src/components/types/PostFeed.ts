export interface PostFeedProps {
    photoUrl: string | null | undefined,
    name: string,
    text: string | null,
    image?: string | null,
    likes?: number,
    comments?: number
}