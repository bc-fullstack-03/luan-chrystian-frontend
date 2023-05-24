export interface PublicationProps  {
    postId: string;
    authorId: string;
    nameAuthor: string;
    username: string;
    contentText: string;
    photoProfile?: string;
    contentImage?: string;
    created_at: string;
    comments?: Comment[];
    likes?: Like[];
    liked: boolean
};