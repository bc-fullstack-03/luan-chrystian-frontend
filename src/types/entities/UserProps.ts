  interface User {
    id: string;
    name: string;
    email: string;
    username: string;
    avatarUri: string;
    followers: Follower[];
    following: Following[];
    biography: Biography[];
  }