 interface FriendProps {
    name: string,
    username: string
    photoUrl: string | null,
    follows?: Follower[] | null |  undefined
    following?: Following[] | null | undefined
    handle?: () => void
    isFollowed?: boolean
}