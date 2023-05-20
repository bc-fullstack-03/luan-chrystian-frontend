interface Comment  {
    id: string;
    authorId: string;
    postId: string;
    content: string;
};

interface Like  {
    name: string;
    userId: string;
    postId: string;
};

interface PublicationProps  {
    postId: string;
    authorId: string;
    nameAuthor: string;
    contentText: string;
    photoProfile?: string;
    contentImage?: string;
    created_at: string;
    comments?: Comment[];
    likes?: Like[];
};