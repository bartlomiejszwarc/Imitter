import { User } from './User';

export interface Author {
  username: string;
  displayName: string;
  profilePicture: string;
  _id: string;
}
export interface Post {
  _id: string;
  text: string;
  date: Date;
  imageUrl: string | undefined;
  likesCounter: number;
  author: Author; //{ username: string; displayName: string; profilePicture: string }
  likedByIdArray: Array<String>;
}
