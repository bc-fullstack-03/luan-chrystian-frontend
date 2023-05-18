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
    photoProfileAuthor?: string;
    contentImage?: string;
    createdAt: string;
    comments?: Comment[];
    likes?: Like[];
};