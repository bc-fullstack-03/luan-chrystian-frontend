 interface FriendProps {
    name: string,
    photoUrl: string | null,
    follows?: Follower[] | null |  undefined
    following?: Following[] | null | undefined
    handle?: () => void
    isFollowed?: boolean
}