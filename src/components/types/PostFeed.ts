export interface PostFeedProps {
    photoUrl: string | null,
    name: string,
    text: string | null,
    image?: string,
    likes?: number,
    comments?: number
}