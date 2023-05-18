interface Follower {
    name: string;
    username: string;
    id: string;
  }
  
  interface Following {
    name: string;
    username: string;
    id: string;
  }
  
  interface Biography {
    id: string;
    user_id: string;
    type: string;
    value: string;
  }
  
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