export interface PostProps {
    profile?: string,
    name: string,
    text: string | null,
    image?: string,
    likes: number,
    comments: number
}